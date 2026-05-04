package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.config.JwtUtils;
import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.service.CustomUserDetailsService;
import com.revision.smart_revision_scheduler.service.EmailService;
import com.revision.smart_revision_scheduler.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService;

    @Data
    @AllArgsConstructor
    public static class LoginResponse {
        private String token;
        private String username;
        private String role;
        private Long id;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        String identifier = user.getUsername();
        Optional<User> existing = userService.findByUsernameOrEmail(identifier);
        
        if (existing.isPresent()) {
            User loggedInUser = existing.get();
            
            if (!loggedInUser.isEmailVerified()) {
                java.util.Map<String, String> error = new java.util.HashMap<>();
                error.put("message", "ACCOUNT_UNVERIFIED");
                error.put("email", loggedInUser.getEmail());
                return ResponseEntity.status(403).body(error);
            }

            try {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(identifier, user.getPassword())
                );
            } catch (Exception e) {
                java.util.Map<String, String> error = new java.util.HashMap<>();
                error.put("message", "Invalid credentials");
                return ResponseEntity.status(401).body(error);
            }

            final UserDetails userDetails = userDetailsService.loadUserByUsername(identifier);
            final String jwt = jwtUtils.generateToken(userDetails);
            
            loggedInUser.setLastLogin(LocalDateTime.now());
            userService.updateUser(loggedInUser);

            // Send login email reminder
            if (loggedInUser.getEmail() != null && !loggedInUser.getEmail().isEmpty()) {
                try {
                    emailService.sendSimpleMessage(
                        loggedInUser.getEmail(), 
                        "Study Reminder: Login Successful", 
                        "Hello " + loggedInUser.getUsername() + ", you have logged in. Happy studying!"
                    );
                } catch (Exception e) {
                }
            }

            return ResponseEntity.ok(new LoginResponse(
                    jwt, 
                    loggedInUser.getUsername(), 
                    loggedInUser.getRole().name(), 
                    loggedInUser.getId()
            ));
        }
        java.util.Map<String, String> error = new java.util.HashMap<>();
        error.put("message", "User not found.");
        return ResponseEntity.status(401).body(error);
    }

    @PostMapping("/verify-passcode")
    public ResponseEntity<?> verifyPasscode(@RequestBody java.util.Map<String, String> request) {
        try {
            String email = request.get("email");
            String passcode = request.get("passcode");
            userService.verifyPasscode(email, passcode);
            java.util.Map<String, String> response = new java.util.HashMap<>();
            response.put("message", "Successfully verified! You can now log in.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            java.util.Map<String, String> error = new java.util.HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/resend-passcode")
    public ResponseEntity<?> resendPasscode(@RequestBody java.util.Map<String, String> request) {
        try {
            String email = request.get("email");
            userService.resendPasscode(email);
            java.util.Map<String, String> response = new java.util.HashMap<>();
            response.put("message", "New passcode sent to your email.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            java.util.Map<String, String> error = new java.util.HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String token) {
        try {
            userService.verifyUser(token);
            java.util.Map<String, String> response = new java.util.HashMap<>();
            response.put("message", "Email verified successfully! You can now log in.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            java.util.Map<String, String> error = new java.util.HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
