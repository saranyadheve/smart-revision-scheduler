package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.entity.LearningModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningModuleRepository extends JpaRepository<LearningModule, Long> {
}
