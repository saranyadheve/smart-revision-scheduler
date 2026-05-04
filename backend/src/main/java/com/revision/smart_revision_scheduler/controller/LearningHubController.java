package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.entity.*;
import com.revision.smart_revision_scheduler.service.LearningService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/learning")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LearningHubController {
    private final LearningService learningService;

    @GetMapping("/modules")
    public List<LearningModule> getAllModules() {
        return learningService.getAllModules();
    }

    @GetMapping("/modules/{moduleId}/topics")
    public List<LearningTopic> getTopics(@PathVariable Long moduleId) {
        return learningService.getTopicsByModule(moduleId);
    }

    @GetMapping("/topics/{topicId}/content")
    public LearningContent getContent(@PathVariable Long topicId) {
        return learningService.getContentForTopic(topicId);
    }

    @PostMapping("/topics/{topicId}/generate")
    public Map<String, Object> generateContent(@PathVariable Long topicId) {
        return learningService.triggerGeneration(topicId);
    }

    @GetMapping("/jobs/{jobId}")
    public Map<String, Object> getJobStatus(@PathVariable String jobId) {
        return learningService.getJobStatus(jobId);
    }

    @PostMapping("/topics/{topicId}/save-results")
    public LearningContent saveResults(@PathVariable Long topicId, @RequestBody Map<String, Object> result) {
        return learningService.saveGeneratedResults(topicId, result);
    }

    @PostMapping("/topics/{topicId}/progress")
    public UserProgress updateProgress(
            @RequestParam Long userId,
            @PathVariable Long topicId,
            @RequestParam boolean completed) {
        return learningService.updateProgress(userId, topicId, completed);
    }

    @GetMapping("/stats/completion/{userId}")
    public double getCompletionRate(@PathVariable Long userId) {
        return learningService.getCompletionRate(userId);
    }
}
