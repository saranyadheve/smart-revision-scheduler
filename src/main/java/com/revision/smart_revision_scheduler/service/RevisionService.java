package com.revision.smart_revision_scheduler.service;

import com.revision.smart_revision_scheduler.model.RevisionSession;
import com.revision.smart_revision_scheduler.model.Schedule;
import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.repository.RevisionSessionRepository;
import com.revision.smart_revision_scheduler.repository.ScheduleRepository;
import com.revision.smart_revision_scheduler.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RevisionService {

    private final RevisionSessionRepository revisionSessionRepository;
    private final ScheduleRepository scheduleRepository;
    private final FatigueDetectionAgent fatigueDetectionAgent;
    private final UserRepository userRepository;

    public StatsResponse getUserStats(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        
        Optional<Schedule> latestSchedule = scheduleRepository.findTopByRevisionSessionUserOrderByIdDesc(user);
        
        double fatigue = latestSchedule.map(Schedule::getFatigueScore).orElse(0.0);
        LocalDate nextRevision = latestSchedule.map(Schedule::getRevisionDate).orElse(null);
        
        // Calculate Streak
        List<RevisionSession> allSessions = revisionSessionRepository.findByUserOrderByStudiedDateDesc(user);
        int streak = calculateStreak(allSessions);

        return new StatsResponse(fatigue, nextRevision, streak);
    }

    private int calculateStreak(List<RevisionSession> sessions) {
        if (sessions.isEmpty()) return 0;
        
        Set<LocalDate> uniqueDates = sessions.stream()
                .map(RevisionSession::getStudiedDate)
                .collect(Collectors.toSet());
        
        int streak = 0;
        LocalDate current = LocalDate.now();
        
        // If they haven't studied today, check if they studied yesterday to keep the streak alive
        if (!uniqueDates.contains(current)) {
            current = current.minusDays(1);
        }
        
        while (uniqueDates.contains(current)) {
            streak++;
            current = current.minusDays(1);
        }
        
        return streak;
    }

    @lombok.Value
    public static class StatsResponse {
        double fatigueScore;
        LocalDate revisionDate;
        int streak;
    }

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
