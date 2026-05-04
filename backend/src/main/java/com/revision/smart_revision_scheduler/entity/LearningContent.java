package com.revision.smart_revision_scheduler.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "learning_contents")
public class LearningContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "topic_id", nullable = false)
    private LearningTopic topic;

    private String videoUrl;
    private String pdfUrl;
    private String audioEnUrl;
    private String audioTaUrl;

    @Column(columnDefinition = "TEXT")
    private String videoScript;
    @Column(columnDefinition = "TEXT")
    private String audioEnScript;
    @Column(columnDefinition = "TEXT")
    private String audioTaScript;
}
