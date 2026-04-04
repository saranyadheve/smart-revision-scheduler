package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.listAllUsers());
    }

    @PutMapping("/users/{id}/toggle")
    public ResponseEntity<User> toggleUserStatus(@PathVariable Long id) {
        User user = userService.getUserById(id);
        user.setEnabled(!user.isEnabled());
        userService.updateUser(user);
        return ResponseEntity.ok(user);
    }
}
