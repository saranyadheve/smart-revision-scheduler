package com.revision.smart_revision_scheduler.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevisionSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id") // No authentication for now, can be nullable or handled manually
    private User user;

    private String topicName;

    private int durationMinutes;

    private int difficultyLevel; // 1 to 5

    private LocalDate studiedDate; // Using LocalDate as per "studiedDate" implication
}
