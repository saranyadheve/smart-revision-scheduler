package com.revision.smart_revision_scheduler.entity;

import com.revision.smart_revision_scheduler.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "subtopic_todos", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "course_id", "topic_id", "subtopic_id"})
})
public class SubtopicTodoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "course_id", nullable = false)
    private String courseId; 

    @Column(name = "topic_id", nullable = false)
    private String topicId; 

    @Column(name = "subtopic_id", nullable = false)
    private String subtopicId; 

    private boolean completed = false;

    private LocalDateTime completedAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
