package com.revision.smart_revision_scheduler.service;

import com.revision.smart_revision_scheduler.model.Role;
import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    // Register new user
    public User registerUser(User user) {
        // Strict Validation
        if (user.getUsername() == null || user.getUsername().trim().length() < 3) {
            throw new RuntimeException("Username must be at least 3 characters.");
        }
        
        if (user.getEmail() == null || !user.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new RuntimeException("Please provide a valid email address.");
        }
        user.setEmail(user.getEmail().toLowerCase().trim());

        if (user.getPassword() == null || user.getPassword().length() < 8 || !user.getPassword().matches(".*\\d.*")) {
            throw new RuntimeException("Password must be at least 8 characters and contain at least one number.");
        }

        // Check for duplicates
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken.");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("An account with this email already exists.");
        }

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        
        // Security: Disabled until verified
        user.setEnabled(false);
        user.setEmailVerified(false);
        user.setVerificationToken(java.util.UUID.randomUUID().toString());

        User savedUser = userRepository.save(user);

        // Send Verification Email
        try {
            String verifyUrl = "http://localhost:5173/#/verify/" + savedUser.getVerificationToken();
            emailService.sendSimpleMessage(
                savedUser.getEmail(),
                "Verify Your Smart Revise Account",
                "Hello " + savedUser.getUsername() + ",\n\n" +
                "Welcome to Smart Revise! Please click the link below to verify your email and activate your account:\n" +
                verifyUrl + "\n\n" +
                "Study hard, stay smart!\n" +
                "The Smart Revision Team"
            );
        } catch (Exception e) {
            // Log error but don't fail registration
            System.err.println("Failed to send verification email: " + e.getMessage());
        }

        return savedUser;
    }

    public void verifyUser(String token) {
        Optional<User> userOpt = userRepository.findAll().stream()
                .filter(u -> token.equals(u.getVerificationToken()))
                .findFirst();
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setEnabled(true);
            user.setEmailVerified(true);
            user.setVerificationToken(null); // Clear token
            userRepository.save(user);
        } else {
            throw new RuntimeException("Invalid or expired verification token.");
        }
    }

    // Find user by username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Find user by username or email
    public Optional<User> findByUsernameOrEmail(String identifier) {
        return userRepository.findByUsernameOrEmail(identifier, identifier);
    }

    // Get user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Update user
    public void updateUser(User user) {
        userRepository.save(user);
    }

    // List all users for admin
    public List<User> listAllUsers() {
        return userRepository.findAll();
    }
}