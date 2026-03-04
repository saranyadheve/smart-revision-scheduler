package com.revision.smart_revision_scheduler.service;

import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.repository.UserRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @SuppressWarnings("null")
    public User registerUser(User user) {
        // In production, encrypt password here
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @SuppressWarnings("null")
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
