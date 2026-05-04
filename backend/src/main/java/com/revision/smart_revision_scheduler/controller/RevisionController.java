package com.revision.smart_revision_scheduler.controller;

import java.util.Optional;
import com.revision.smart_revision_scheduler.model.RevisionSession;
import com.revision.smart_revision_scheduler.model.Schedule;
import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.service.RevisionService;
import com.revision.smart_revision_scheduler.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/revisions")
@RequiredArgsConstructor
public class RevisionController {

    private final RevisionService revisionService;
    private final UserService userService;
    private final com.revision.smart_revision_scheduler.repository.ScheduleRepository scheduleRepository;

    @Data
    public static class RevisionRequest {
        private String topicName;
        private int durationMinutes;
        private int difficultyLevel;
    }

    @Data
    public static class RevisionResponse {
        private double fatigueScore;
        private LocalDate revisionDate;
        private String emailStatus;
        private int streak;
        private double accuracy;
    }

    @PostMapping
    public ResponseEntity<RevisionResponse> logSession(@RequestBody RevisionRequest request) {
        RevisionSession session = new RevisionSession();
        session.setTopicName(request.getTopicName());
        session.setDurationMinutes(request.getDurationMinutes());
        session.setDifficultyLevel(request.getDifficultyLevel());

        Schedule schedule = revisionService.processRevision(session);

        RevisionResponse response = new RevisionResponse();
        response.setFatigueScore(schedule.getFatigueScore());
        response.setRevisionDate(schedule.getRevisionDate());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats/{userId}")
    public ResponseEntity<RevisionResponse> getLatestStats(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        Optional<Schedule> latestSchedule = scheduleRepository.findTopByRevisionSessionUserOrderByRevisionDateDesc(user);
        
        RevisionResponse response = new RevisionResponse();
        response.setFatigueScore(latestSchedule.map(Schedule::getFatigueScore).orElse(0.0)); 
        response.setRevisionDate(latestSchedule.map(Schedule::getRevisionDate).orElse(LocalDate.now()));
        response.setStreak(user.getStreak());
        response.setAccuracy(user.getAccuracy());
        
        // Logic for email status
        if (user.getLastInactivityReminderSent() != null && 
            user.getLastInactivityReminderSent().isAfter(LocalDateTime.now().minusDays(1))) {
            response.setEmailStatus("Reminder sent");
        } else {
            response.setEmailStatus("Active user");
        }
        
        return ResponseEntity.ok(response);
    }
}
