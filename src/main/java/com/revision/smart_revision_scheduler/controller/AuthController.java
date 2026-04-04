package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.service.EmailService;
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
    private final EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> existing = userService.findByUsername(user.getUsername());
        if (existing.isPresent() && existing.get().getPassword().equals(user.getPassword())) {
            
            User loggedInUser = existing.get();
            
            // Set lastLogin and save
            loggedInUser.setLastLogin(java.time.LocalDateTime.now());
            userService.updateUser(loggedInUser);

            // Send login email reminder
            if (loggedInUser.getEmail() != null && !loggedInUser.getEmail().isEmpty()) {
                String subject = "Study Reminder: Login Successful";
                String text = "Hello " + loggedInUser.getUsername() + ",\n\n" +
                        "You have successfully logged in to the Smart Revision Scheduler. " +
                        "Don't forget to check your scheduled revision sessions for today!\n\n" +
                        "Happy learning!\nSmart Revision Scheduler";
                emailService.sendSimpleMessage(loggedInUser.getEmail(), subject, text);
            }

            return ResponseEntity.ok("Login Successful. User ID: " + loggedInUser.getId());
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
