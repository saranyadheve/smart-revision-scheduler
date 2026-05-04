package com.revision.smart_revision_scheduler.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class KissaraService {

    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;
    private JsonNode knowledgeBase;

    @PostConstruct
    public void init() {
        try {
            Resource resource = resourceLoader.getResource("classpath:kissara_knowledge.json");
            knowledgeBase = objectMapper.readTree(resource.getInputStream());
            log.info("Kissara Knowledge Base loaded successfully.");
        } catch (IOException e) {
            log.error("Failed to load Kissara knowledge base", e);
        }
    }

    public Map<String, Object> getChatResponse(String message, String course) {
        String query = message.toLowerCase().trim();
        Map<String, Object> response = new HashMap<>();

        // 1. FAQ Search
        String faqAnswer = findFaqMatch(query, course);
        if (faqAnswer != null) {
            response.put("reply", faqAnswer);
            response.put("isFromFaq", true);
        } else {
            // 2. AI Fallback (Simulated intelligent response based on course style)
            response.put("reply", generateAiResponse(message, course));
            response.put("isFromFaq", false);
        }

        // 3. Suggestions
        response.put("suggestions", getSuggestions(course));

        return response;
    }

    private String findFaqMatch(String query, String course) {
        if (knowledgeBase == null || !knowledgeBase.has(course)) return null;

        JsonNode faqs = knowledgeBase.get(course);
        double bestScore = 0;
        String bestAnswer = null;

        for (JsonNode faq : faqs) {
            String question = faq.get("question").asText().toLowerCase();
            double score = calculateSimilarity(query, question);
            if (score > 0.7 && score > bestScore) {
                bestScore = score;
                bestAnswer = faq.get("answer").asText();
            }
        }
        return bestAnswer;
    }

    private double calculateSimilarity(String s1, String s2) {
        // Simple word overlap similarity
        Set<String> words1 = new HashSet<>(Arrays.asList(s1.split("\\s+")));
        Set<String> words2 = new HashSet<>(Arrays.asList(s2.split("\\s+")));
        
        long matches = words1.stream().filter(words2::contains).count();
        return (double) matches / Math.max(words1.size(), words2.size());
    }

    private String generateAiResponse(String message, String course) {
        // Mocking an intelligent course-aware response
        switch (course.toLowerCase()) {
            case "upsc":
                return "As a UPSC expert, here is a structured answer to your question: \"" + message + "\". \n\n" +
                       "Perspective: This topic connects significantly to General Studies. \n" +
                       "Key Points: You should analyze the historical context, current socio-political impact, and future implications. \n\n" +
                       "Is there any specific sub-section you'd like to dive into?";
            case "gate":
                return "From a GATE technical perspective, solving \"" + message + "\" requires deep conceptual understanding. \n\n" +
                       "Core Concept: Ensure you've covered the fundamental laws and formulas related to this. \n" +
                       "Strategy: I suggest practicing numerical problems for this topic as GATE often prioritizes application. \n\n" +
                       "Should I show you some relevant formulas?";
            case "it":
                return "For an IT Interview, this question is quite common. \n\n" +
                       "Technical Hint: Be ready to explain the time and space complexity if this is a coding question. \n" +
                       "HR Context: If this is an behavioral question, use the STAR method (Situation, Task, Action, Result). \n\n" +
                       "Would you like an example answer?";
            case "tnpsc":
                return "For TNPSC, this is a factual topic you should memorize carefully. \n\n" +
                       "Fact Highlight: Make sure to cross-check this with the latest state board textbooks. \n" +
                       "Focus Area: Unit 8 and 9 are particularly important for this course currently.";
            default:
                return "Interesting question! I'm researching the best prep strategy for this. In the meantime, tell me more about your specific goals.";
        }
    }

    private List<String> getSuggestions(String course) {
        List<String> suggestions = new ArrayList<>();
        if (knowledgeBase != null && knowledgeBase.has("suggestions") && knowledgeBase.get("suggestions").has(course)) {
            JsonNode nodes = knowledgeBase.get("suggestions").get(course);
            for (JsonNode node : nodes) {
                suggestions.add(node.asText());
            }
        }
        // Shuffle and pick 3
        Collections.shuffle(suggestions);
        return suggestions.subList(0, Math.min(3, suggestions.size()));
    }
}
