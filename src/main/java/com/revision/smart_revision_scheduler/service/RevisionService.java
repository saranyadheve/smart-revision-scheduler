package com.revision.smart_revision_scheduler.service;

import com.revision.smart_revision_scheduler.model.RevisionSession;
import com.revision.smart_revision_scheduler.model.Schedule;
import com.revision.smart_revision_scheduler.repository.RevisionSessionRepository;
import com.revision.smart_revision_scheduler.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class RevisionService {

    private final RevisionSessionRepository revisionSessionRepository;
    private final ScheduleRepository scheduleRepository;

    public Schedule processRevision(RevisionSession session) {
        // 1. Save Revision Session
        if (session.getStudiedDate() == null) {
            session.setStudiedDate(LocalDate.now());
        }
        RevisionSession savedSession = revisionSessionRepository.save(session);

        // 2. Call AI Service (Dummy Logic)
        double fatigueScore = calculateDummyFatigue();

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

    private double calculateDummyFatigue() {
        // Return random score between 0.0 and 1.0
        return Math.random();
    }
}
