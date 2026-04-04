package com.revision.smart_revision_scheduler.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class FatigueDetectionAgent {

    private final RestTemplate restTemplate;
    private static final String PYTHON_SERVICE_URL = "http://localhost:8000/predict-fatigue";

    public double predictFatigueScore(int frequency, int gapDays, int durationMinutes, int difficultyLevel) {
        try {
            // Prepare request for Python AI Service
            Map<String, Object> request = new HashMap<>();
            request.put("frequency", frequency);
            request.put("gap_days", gapDays);
            request.put("duration_minutes", durationMinutes);
            request.put("difficulty", difficultyLevel);

            // Call Python FastAPI
            log.info("Calling Python AI Service for fatigue prediction...");
            Map<String, Double> response = restTemplate.postForObject(PYTHON_SERVICE_URL, request, Map.class);

            if (response != null && response.containsKey("fatigue_score")) {
                return response.get("fatigue_score");
            }
        } catch (Exception e) {
            log.error("Failed to call AI Service: {}. Falling back to heuristic logic.", e.getMessage());
        }

        // Fallback to dummy heuristic logic if Python service is down
        double fatigue = 0.0;
        if (durationMinutes > 120) fatigue += 0.4;
        else if (durationMinutes > 60) fatigue += 0.2;
        
        if (difficultyLevel >= 4) fatigue += 0.3;
        else if (difficultyLevel == 3) fatigue += 0.15;
        
        if (gapDays < 2) fatigue += 0.1;
        if (frequency > 5) fatigue -= 0.1;
        
        return Math.max(0.0, Math.min(fatigue, 1.0));
    }
}
