package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.entity.LearningTopic;
import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findByUserAndTopic(User user, LearningTopic topic);
    List<UserProgress> findByUser(User user);
    List<UserProgress> findByUserAndCompleted(User user, boolean completed);
}
