package com.revision.smart_revision_scheduler.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "learning_topics")
public class LearningTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "module_id", nullable = false)
    private LearningModule module;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private int orderIndex;
}
