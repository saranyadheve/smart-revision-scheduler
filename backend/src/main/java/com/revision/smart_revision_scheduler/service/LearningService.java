package com.revision.smart_revision_scheduler.service;

import com.revision.smart_revision_scheduler.entity.*;
import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class LearningService {
    private final LearningModuleRepository moduleRepository;
    private final LearningTopicRepository topicRepository;
    private final LearningContentRepository contentRepository;
    private final UserProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    private static final String AI_SERVICE_URL = "http://localhost:8000";

    public List<LearningModule> getAllModules() {
        return moduleRepository.findAll();
    }

    public List<LearningTopic> getTopicsByModule(Long moduleId) {
        LearningModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found"));
        return topicRepository.findByModuleOrderByOrderIndexAsc(module);
    }

    public LearningContent getContentForTopic(Long topicId) {
        LearningTopic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        return contentRepository.findByTopic(topic).orElse(null);
    }

    public Map<String, Object> triggerGeneration(Long topicId) {
        LearningTopic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        Map<String, Object> request = new HashMap<>();
        request.put("topicId", topicId);
        request.put("title", topic.getTitle());
        request.put("summary", topic.getDescription());

        try {
            return restTemplate.postForObject(AI_SERVICE_URL + "/generate-content", request, Map.class);
        } catch (Exception e) {
            throw new RuntimeException("AI Service unavailable: " + e.getMessage());
        }
    }

    public Map<String, Object> getJobStatus(String jobId) {
        try {
            return restTemplate.getForObject(AI_SERVICE_URL + "/job-status/" + jobId, Map.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch job status: " + e.getMessage());
        }
    }

    public LearningContent saveGeneratedResults(Long topicId, Map<String, Object> result) {
        LearningTopic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        LearningContent content = contentRepository.findByTopic(topic)
                .orElse(new LearningContent());
        
        content.setTopic(topic);
        content.setVideoUrl((String) result.get("videoUrl"));
        content.setAudioEnUrl((String) result.get("audioEnglishUrl"));
        content.setAudioTaUrl((String) result.get("audioTamilUrl"));
        content.setPdfUrl((String) result.get("pdfUrl"));
        content.setVideoScript((String) result.get("videoScript"));
        content.setAudioEnScript((String) result.get("audioEnScript"));
        content.setAudioTaScript((String) result.get("audioTaScript"));

        return contentRepository.save(content);
    }

    public double getCompletionRate(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User found"));
        long totalTopics = topicRepository.count();
        if (totalTopics == 0) return 0.0;
        long completedTopics = progressRepository.findByUserAndCompleted(user, true).size();
        return (double) completedTopics / totalTopics;
    }

    public UserProgress updateProgress(Long userId, Long topicId, boolean completed) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        LearningTopic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        UserProgress progress = progressRepository.findByUserAndTopic(user, topic)
                .orElse(new UserProgress());
        
        progress.setUser(user);
        progress.setTopic(topic);
        progress.setCompleted(completed);
        progress.setLastAccessed(LocalDateTime.now());
        
        return progressRepository.save(progress);
    }
}
