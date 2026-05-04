package com.revision.smart_revision_scheduler.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.*;

@Service
public class AIService {

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private List<Map<String, String>> knowledgeBase = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void init() {
        try (InputStream is = getClass().getResourceAsStream("/kissara_knowledge.json")) {
            if (is != null) {
                knowledgeBase = objectMapper.readValue(is, new TypeReference<List<Map<String, String>>>() {});
                System.out.println("Loaded " + knowledgeBase.size() + " knowledge items for AstraMind.");
            }
        } catch (Exception e) {
            System.err.println("Failed to load AstraMind knowledge: " + e.getMessage());
        }
    }

    public Map<String, Object> generateKissaraResponse(String course, String message, String userName) {
        try {
            Map<String, Object> result = new HashMap<>();

            if (message == null || message.trim().isEmpty()) {
                result.put("reply", "Please provide a question so I can assist you.");
                return result;
            }

            // 1. Check Knowledge Base (Step 1 matching)
            String faqReply = findInKnowledgeBase(course, message);
            if (faqReply != null) {
                result.put("reply", faqReply);
                result.put("suggestions", generateSuggestions(course, message));
                return result;
            }

            // 2. Fallback to Gemini
            String aiReply = callGemini(course, message, userName);
            result.put("reply", aiReply);
            result.put("suggestions", generateSuggestions(course, message));
            
            return result;
        } catch (Exception e) {
            System.err.println("Critical Error in generateKissaraResponse: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("reply", "I'm having a little moment—my brain is quite large! Please try repeating your question or refreshing the page.");
            return errorResult;
        }
    }

    private String findInKnowledgeBase(String course, String query) {
        if (knowledgeBase == null || query == null) return null;
        String normalizedQuery = query.toLowerCase().trim();
        if (normalizedQuery.length() < 3) return null; // Avoid matching short greetings like 'hi'
        
        for (Map<String, String> item : knowledgeBase) {
            if (item.get("course").equalsIgnoreCase(course)) {
                String question = item.get("question").toLowerCase();
                if (normalizedQuery.contains(question) || question.contains(normalizedQuery)) {
                    return item.get("answer");
                }
            }
        }
        return null;
    }

    private List<String> generateSuggestions(String course, String lastQuery) {
        List<String> s = new ArrayList<>();
        if (course == null) return s;
        
        switch (course.toLowerCase()) {
            case "upsc":
                s.add("UPSC syllabus");
                s.add("Preparation strategy");
                s.add("How many stages in UPSC?");
                break;
            case "tnpsc":
                s.add("Group 4 syllabus");
                s.add("Current Affairs");
                s.add("What is TNPSC?");
                break;
            case "gate":
                s.add("GATE syllabus");
                s.add("Aptitude for GATE");
                s.add("Validity of score");
                break;
            case "it interview":
                s.add("DSA important topics");
                s.add("System Design basics");
                s.add("Deadlock in OS");
                break;
        }
        return s;
    }

    private String callGemini(String course, String message, String userName) {
        String effectiveUserName = (userName != null && !userName.isEmpty()) ? userName : "Student";
        String systemPrompt = "You are AstraMind, a personal AI tutor for " + course.toUpperCase() + " preparation.\n" +
                "Tone: Friendly, polite, and professional.\n" +
                "Style: Give clear, structured, and helpful answers. Avoid generic responses.\n" +
                "User: " + effectiveUserName + "\n" +
                "The user is currently studying " + course.toUpperCase() + ". Only answer questions related to this or general study advice.\n" +
                "If the question is completely irrelevant to " + course + ", politely ask them to stay on topic.";

        String finalPrompt = systemPrompt + "\nUser Query: " + message;

        if (geminiApiKey == null || geminiApiKey.trim().isEmpty() || geminiApiKey.equals("YOUR_API_KEY_HERE")) {
            return "I am processing that... (API Key Missing)";
        }

        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=" + geminiApiKey.trim();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", finalPrompt);
            Map<String, Object> content = new HashMap<>();
            content.put("parts", List.of(textPart));
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", List.of(content));

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(url, requestEntity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map body = response.getBody();
                List<Map> candidates = (List<Map>) body.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map candidate = candidates.get(0);
                    Map contentObj = (Map) candidate.get("content");
                    List<Map> parts = (List<Map>) contentObj.get("parts");
                    return (String) parts.get(0).get("text");
                }
            } else {
                System.err.println("AstraMind AI Status Error: " + response.getStatusCode());
            }
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            if (e.getStatusCode().value() == 429) {
                return "I'm a bit overwhelmed with questions right now! Please give me about 60 seconds to rest, and then I'll be back to help you.";
            }
            System.err.println("AstraMind AI HTTP Client Error Body: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("AstraMind AI General Error: " + e.getMessage());
        }
        return "Sorry, I couldn't process that right now. Please try again.";
    }

    // Deprecated generic method
    public String generateResponse(String module, String branch, String message, String userName) {
        return (String) generateKissaraResponse(module, message, userName).get("reply");
    }
}