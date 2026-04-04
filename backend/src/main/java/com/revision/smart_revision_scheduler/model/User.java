package com.revision.smart_revision_scheduler.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String email;

    private java.time.LocalDateTime lastLogin;

    private java.time.LocalDateTime lastInactivityReminderSent;

    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean enabled = false;
    private boolean isEmailVerified = false;
    private String verificationToken;
}
