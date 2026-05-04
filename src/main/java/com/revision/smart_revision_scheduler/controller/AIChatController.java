package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.service.KissaraService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIChatController {

    private final KissaraService kissaraService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chat(@RequestBody ChatRequest request) {
        String course = request.getCourse();
        if (course == null || course.isEmpty()) {
            course = "upsc"; // Default
        }
        
        Map<String, Object> result = kissaraService.getChatResponse(request.getMessage(), course);
        return ResponseEntity.ok(result);
    }

    @Data
    public static class ChatRequest {
        private String message;
        private String course;
    }
}
