package com.revision.smart_revision_scheduler.service;

import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    // Runs every 24 hours to check for inactive users
    @Scheduled(cron = "0 0 10 * * ?") // 10 AM daily
    public void sendInactivityReminders() {
        LocalDateTime threshold = LocalDateTime.now().minusDays(1);
        List<User> inactiveUsers = userRepository.findAll().stream()
                .filter(u -> u.getLastLogin() != null && u.getLastLogin().isBefore(threshold))
                .filter(u -> u.getEmail() != null && !u.getEmail().isEmpty())
                .toList();

        for (User user : inactiveUsers) {
            String subject = "Revise Your Progress: Smart Revision Scheduler";
            String text = "Hello " + user.getUsername() + ",\n\n" +
                    "It's been over 24 hours since your last revision session. " +
                    "Consistency is key to mastery! Check your dashboard for today's scheduled tasks.\n\n" +
                    "Best,\nSmart Revision Team";
            try {
                sendSimpleMessage(user.getEmail(), subject, text);
                user.setLastInactivityReminderSent(LocalDateTime.now());
                userRepository.save(user);
            } catch (Exception e) {
                // Log and continue
            }
        }
    }
}
