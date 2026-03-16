package com.revision.smart_revision_scheduler.service;

import com.revision.smart_revision_scheduler.model.RevisionSession;
import com.revision.smart_revision_scheduler.model.Schedule;
import com.revision.smart_revision_scheduler.repository.RevisionSessionRepository;
import com.revision.smart_revision_scheduler.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RevisionService {

    private final RevisionSessionRepository revisionSessionRepository;
    private final ScheduleRepository scheduleRepository;
    private final FatigueDetectionAgent fatigueDetectionAgent;

    public Schedule processRevision(RevisionSession session) {
        // 1. Save Revision Session
        if (session.getStudiedDate() == null) {
            session.setStudiedDate(LocalDate.now());
        }
        
        // Calculate gap days (difference between today and the LAST time this was studied)
        int gapDays = 0;
        Optional<RevisionSession> lastSessionOpt = revisionSessionRepository.findTopByUserAndTopicNameOrderByStudiedDateDesc(session.getUser(), session.getTopicName());
        if (lastSessionOpt.isPresent()) {
            gapDays = (int) ChronoUnit.DAYS.between(lastSessionOpt.get().getStudiedDate(), session.getStudiedDate());
        }

        RevisionSession savedSession = revisionSessionRepository.save(session);
        
        // Calculate frequency (how many times this topic has been studied, including the one just saved)
        int frequency = (int) revisionSessionRepository.countByUserAndTopicName(session.getUser(), session.getTopicName());

        // 2. Call AI Service
        log.info("Requesting fatigue score with parameters: freq={}, gap={}, duration={}, difficulty={}",
                frequency, gapDays, savedSession.getDurationMinutes(), savedSession.getDifficultyLevel());
        double fatigueScore = fatigueDetectionAgent.predictFatigueScore(
                frequency, gapDays, savedSession.getDurationMinutes(), savedSession.getDifficultyLevel());

        // 3. Create Schedule based on Fatigue Score
        // Logic: > 0.7 -> +2 days, 0.4-0.7 -> +1 day, else -> Today
        LocalDate nextRevisionDate;
        if (fatigueScore > 0.7) {
            nextRevisionDate = LocalDate.now().plusDays(2);
        } else if (fatigueScore >= 0.4) {
            nextRevisionDate = LocalDate.now().plusDays(1);
        } else {
            nextRevisionDate = LocalDate.now();
        }

        Schedule schedule = new Schedule();
        schedule.setRevisionSession(savedSession);
        schedule.setFatigueScore(fatigueScore);
        schedule.setRevisionDate(nextRevisionDate);

        return scheduleRepository.save(schedule);
    }
}
