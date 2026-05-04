package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.model.SubtopicTodo;
import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.repository.SubtopicTodoRepository;
import com.revision.smart_revision_scheduler.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class SubtopicTodoController {

    private final SubtopicTodoRepository todoRepository;
    private final UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SubtopicTodo>> getTodos(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return ResponseEntity.ok(todoRepository.findByUserOrderByCreatedAtDesc(user));
    }

    @PostMapping("/user/{userId}/toggle")
    public ResponseEntity<SubtopicTodo> toggleTodo(@PathVariable Long userId, @RequestBody TodoToggleRequest request) {
        User user = userRepository.findById(userId).orElseThrow();
        
        SubtopicTodo todo;
        if (request.getId() != null && request.getId() > 0) {
            todo = todoRepository.findById(request.getId()).orElseThrow();
        } else {
            // If it doesn't exist, create it (frontend sometimes sends new text to toggle)
            todo = new SubtopicTodo();
            todo.setUser(user);
            todo.setText(request.getText());
            todo.setCategory(request.getCategory());
        }
        
        todo.setCompleted(!todo.isCompleted());
        return ResponseEntity.ok(todoRepository.save(todo));
    }

    @Data
    public static class TodoToggleRequest {
        private Long id;
        private String text;
        private String category;
    }
}
