package com.revision.smart_revision_scheduler.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "learning_modules")
public class LearningModule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // e.g., UPSC, TNPSC, GATE, IT

    private String description;
    private String icon; // Icon name for frontend
    
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    private List<LearningTopic> topics;
}
