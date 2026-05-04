package com.revision.smart_revision_scheduler.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "user_progress")
public class UserProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private com.revision.smart_revision_scheduler.model.User user;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private LearningTopic topic;

    private boolean completed;
    private LocalDateTime lastAccessed;
}
