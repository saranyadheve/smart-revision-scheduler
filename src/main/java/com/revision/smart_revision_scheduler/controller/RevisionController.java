package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.model.RevisionSession;
import com.revision.smart_revision_scheduler.model.Schedule;
import com.revision.smart_revision_scheduler.service.RevisionService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/revisions")
@RequiredArgsConstructor
public class RevisionController {

    private final RevisionService revisionService;

    @GetMapping("/stats/{userId}")
    public ResponseEntity<RevisionService.StatsResponse> getStats(@PathVariable Long userId) {
        return ResponseEntity.ok(revisionService.getUserStats(userId));
    }

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
    }

    @PostMapping
    public ResponseEntity<RevisionResponse> logSession(@RequestBody RevisionRequest request) {
        // Map DTO to Entity
        RevisionSession session = new RevisionSession();
        session.setTopicName(request.getTopicName());
        session.setDurationMinutes(request.getDurationMinutes());
        session.setDifficultyLevel(request.getDifficultyLevel());

        // Process
        Schedule schedule = revisionService.processRevision(session);

        // Map Entity to Response DTO
        RevisionResponse response = new RevisionResponse();
        response.setFatigueScore(schedule.getFatigueScore());
        response.setRevisionDate(schedule.getRevisionDate());

        return ResponseEntity.ok(response);
    }
}
