package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.entity.LearningModule;
import com.revision.smart_revision_scheduler.entity.LearningTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LearningTopicRepository extends JpaRepository<LearningTopic, Long> {
    List<LearningTopic> findByModuleOrderByOrderIndexAsc(LearningModule module);
}
