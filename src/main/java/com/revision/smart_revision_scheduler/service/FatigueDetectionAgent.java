package com.revision.smart_revision_scheduler.service;

import org.springframework.stereotype.Service;

@Service
public class FatigueDetectionAgent {

    /**
     * Dummy AI logic for fatigue calculation.
     * Evaluates parameters to predict a fatigue score between 0.0 and 1.0.
     *
     * @param frequency       Number of times the topic has been studied
     * @param gapDays         Days since last study session
     * @param durationMinutes Duration of recent study session
     * @param difficultyLevel Difficulty level of the topic (e.g., 1-5)
     * @return fatigueScore between 0.0 and 1.0
     */
    public double predictFatigueScore(int frequency, int gapDays, int durationMinutes, int difficultyLevel) {
        double fatigue = 0.0;
        
        // Basic heuristic rules for dummy AI calculation
        // High duration increases fatigue
        if (durationMinutes > 120) {
            fatigue += 0.4;
        } else if (durationMinutes > 60) {
            fatigue += 0.2;
        }
        
        // High difficulty increases fatigue
        if (difficultyLevel >= 4) {
            fatigue += 0.3;
        } else if (difficultyLevel == 3) {
            fatigue += 0.15;
        }
        
        // Low gap days (cramming) increases fatigue slightly
        if (gapDays < 2) {
            fatigue += 0.1;
        }
        
        // High frequency might decrease fatigue slightly (familiarity)
        if (frequency > 5) {
            fatigue -= 0.1;
        }
        
        // Ensure score is between 0.0 and 1.0
        return Math.max(0.0, Math.min(fatigue, 1.0));
    }
}
