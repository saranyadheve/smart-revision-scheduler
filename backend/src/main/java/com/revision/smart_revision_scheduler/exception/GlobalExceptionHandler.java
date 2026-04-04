package com.revision.smart_revision_scheduler.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", e.getMessage());
        response.put("status", 400);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        Map<String, Object> response = new HashMap<>();
        String message = "Database integrity violation. Duplicate data or missing required field.";
        
        if (e.getMessage() != null) {
            if (e.getMessage().contains("users(username)")) {
                message = "Username is already taken.";
            } else if (e.getMessage().contains("users(email)")) {
                message = "An account with this email already exists.";
            }
        }
        
        response.put("message", message);
        response.put("status", 400);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception e) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "An unexpected error occurred: " + e.getMessage());
        response.put("status", 500);
        return ResponseEntity.internalServerError().body(response);
    }
}
