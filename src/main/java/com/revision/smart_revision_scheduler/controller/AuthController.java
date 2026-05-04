package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.model.*;
import com.revision.smart_revision_scheduler.repository.UserRepository;
import com.revision.smart_revision_scheduler.service.EmailService;
import com.revision.smart_revision_scheduler.service.JwtService;
import com.revision.smart_revision_scheduler.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        System.out.println("DEBUG: Register endpoint hit for user: " + request.getUsername());
        
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        if (request.getEmail() != null && userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }
        
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.USER);
        
        try {
            User registeredUser = userService.registerUser(user);
            
            // Send welcome email after successful registration
            try {
                if (registeredUser.getEmail() != null && !registeredUser.getEmail().isEmpty()) {
                    String subject = "Welcome to Smart Revision Scheduler!";
                    String text = "Hello " + registeredUser.getUsername() + ",\n\n" +
                            "Thank you for joining Smart Revision Scheduler. Your account has been created successfully.\n" +
                            "You can now start organizing your study topics and tracking your progress.\n\n" +
                            "Happy Learning!\nSmart Revision Team";
                    emailService.sendSimpleMessage(registeredUser.getEmail(), subject, text);
                    System.out.println("DEBUG: Registration welcome email sent to: " + registeredUser.getEmail());
                }
            } catch (Exception e) {
                System.err.println("Failed to send registration email: " + e.getMessage());
                // Non-critical, so we don't return error to user
            }

            String jwtToken = jwtService.generateToken(registeredUser);
            return ResponseEntity.ok(AuthResponse.builder()
                    .token(jwtToken)
                    .username(registeredUser.getUsername())
                    .role(registeredUser.getRole())
                    .id(registeredUser.getId())
                    .build());
        } catch (Exception e) {
            System.err.println("CRITICAL ERROR during registration: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Registration Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        System.out.println("DEBUG: Login endpoint hit for user: " + request.getUsername());
        
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
        
        User user = userRepository.findByUsername(request.getUsername())
                .or(() -> userRepository.findByEmail(request.getUsername()))
                .orElseThrow(() -> new RuntimeException("User not found after authentication"));
        
        user.setLastLogin(java.time.LocalDateTime.now());
        userService.updateUser(user);

        try {
            if (user.getEmail() != null && !user.getEmail().isEmpty()) {
                String subject = "Study Reminder: Login Successful";
                String text = "Hello " + user.getUsername() + ",\n\n" +
                        "You have successfully logged in to the Smart Revision Scheduler. " +
                        "Happy learning!\nSmart Revision Scheduler";
                emailService.sendSimpleMessage(user.getEmail(), subject, text);
            }
        } catch (Exception e) {
            System.err.println("Failed to send login email: " + e.getMessage());
        }

        String jwtToken = jwtService.generateToken(user);
        return ResponseEntity.ok(AuthResponse.builder()
                .token(jwtToken)
                .username(user.getUsername())
                .role(user.getRole())
                .id(user.getId())
                .build());
    }
}
