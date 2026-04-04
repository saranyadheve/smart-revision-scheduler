package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);

    @Query("SELECT u FROM User u WHERE u.lastLogin < :threshold AND (u.lastInactivityReminderSent IS NULL OR u.lastInactivityReminderSent < u.lastLogin)")
    List<User> findInactiveUsersForReminder(@Param("threshold") LocalDateTime threshold);
}
