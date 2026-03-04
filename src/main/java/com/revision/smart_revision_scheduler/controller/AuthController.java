package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> existing = userService.findByUsername(user.getUsername());
        if (existing.isPresent() && existing.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok("Login Successful. User ID: " + existing.get().getId());
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
