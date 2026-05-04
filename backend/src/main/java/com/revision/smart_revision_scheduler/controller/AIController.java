package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.service.AIService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<?> handleChat(
            @RequestBody ChatRequest request,
            org.springframework.security.core.Authentication authentication) {
        
        if (request == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Request body is missing"));
        }
        
        String course = request.getCourse() != null ? request.getCourse() : "upsc";
        String message = request.getMessage() != null ? request.getMessage() : "";
        String userName = (authentication != null) ? authentication.getName() : "Scholar";

        return ResponseEntity.ok(aiService.generateKissaraResponse(course, message, userName));
    }

    @Data
    public static class ChatRequest {
        private String course;
        private String message;
    }
}
