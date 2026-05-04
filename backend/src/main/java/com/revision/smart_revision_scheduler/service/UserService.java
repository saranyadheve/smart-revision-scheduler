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
        
        // Generate 4-digit passcode instead of token
        String passcode = String.format("%04d", new java.util.Random().nextInt(10000));
        user.setVerificationPasscode(passcode);
        user.setPasscodeExpiry(java.time.LocalDateTime.now().plusMinutes(20));
        
        // Ensure defaults are set to avoid SQL "no default value" errors
        user.setStreak(0);
        user.setAccuracy(0.0);

        User savedUser = userRepository.save(user);

        // Send Verification Email with Passcode
        sendPasscodeEmail(savedUser, passcode);

        return savedUser;
    }

    private void sendPasscodeEmail(User user, String passcode) {
        try {
            emailService.sendSimpleMessage(
                user.getEmail(),
                "Verify Your Smart Revise Account",
                "Hello " + user.getUsername() + ",\n\n" +
                "Welcome to Smart Revise! Your 4-digit verification passcode is:\n\n" +
                "   [" + passcode + "]\n\n" +
                "This code will expire in 20 minutes.\n" +
                "Please enter this code on the login screen to activate your account.\n\n" +
                "Study hard, stay smart!\n" +
                "The Smart Revision Team"
            );
        } catch (Exception e) {
            System.err.println("Failed to send verification email: " + e.getMessage());
        }
    }

    public void resendPasscode(String email) {
        User user = userRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(() -> new RuntimeException("No account found with this email."));
        
        if (user.isEnabled()) {
            throw new RuntimeException("This account is already verified.");
        }

        String passcode = String.format("%04d", new java.util.Random().nextInt(10000));
        user.setVerificationPasscode(passcode);
        user.setPasscodeExpiry(java.time.LocalDateTime.now().plusMinutes(20));
        userRepository.save(user);

        sendPasscodeEmail(user, passcode);
    }

    public void verifyPasscode(String email, String passcode) {
        User user = userRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(() -> new RuntimeException("Account not found."));
        
        if (user.getPasscodeExpiry() == null || user.getPasscodeExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new RuntimeException("Passcode has expired. Please request a new one.");
        }

        if (passcode.equals(user.getVerificationPasscode())) {
            user.setEnabled(true);
            user.setEmailVerified(true);
            user.setVerificationPasscode(null);
            user.setPasscodeExpiry(null);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Invalid verification passcode.");
        }
    }

    public void verifyUser(String token) {
        // Fallback or deprecated link verification
        Optional<User> userOpt = userRepository.findAll().stream()
                .filter(u -> token.equals(u.getVerificationToken()))
                .findFirst();
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setEnabled(true);
            user.setEmailVerified(true);
            user.setVerificationToken(null);
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