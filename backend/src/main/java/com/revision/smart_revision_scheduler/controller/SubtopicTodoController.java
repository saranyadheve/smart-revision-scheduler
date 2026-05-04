package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.entity.SubtopicTodoEntity;
import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.repository.SubtopicTodoRepository;
import com.revision.smart_revision_scheduler.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class SubtopicTodoController {

    private final SubtopicTodoRepository todoRepository;
    private final UserService userService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SubtopicTodoEntity>> getUserTodos(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(todoRepository.findByUser(user));
    }

    @PostMapping("/user/{userId}/toggle")
    public ResponseEntity<SubtopicTodoEntity> toggleTodo(@PathVariable Long userId, @RequestBody SubtopicTodoEntity todoDetails) {
        User user = userService.getUserById(userId);
        
        SubtopicTodoEntity todo = todoRepository.findByUserAndCourseIdAndTopicIdAndSubtopicId(
                user, todoDetails.getCourseId(), todoDetails.getTopicId(), todoDetails.getSubtopicId()
        ).orElseGet(() -> {
            SubtopicTodoEntity newTodo = new SubtopicTodoEntity();
            newTodo.setUser(user);
            newTodo.setCourseId(todoDetails.getCourseId());
            newTodo.setTopicId(todoDetails.getTopicId());
            newTodo.setSubtopicId(todoDetails.getSubtopicId());
            return newTodo;
        });

        todo.setCompleted(todoDetails.isCompleted());
        todo.setCompletedAt(todoDetails.isCompleted() ? LocalDateTime.now() : null);
        
        return ResponseEntity.ok(todoRepository.save(todo));
    }
}
