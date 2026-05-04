package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.entity.SubtopicTodoEntity;
import com.revision.smart_revision_scheduler.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SubtopicTodoRepository extends JpaRepository<SubtopicTodoEntity, Long> {
    List<SubtopicTodoEntity> findByUser(User user);
    Optional<SubtopicTodoEntity> findByUserAndCourseIdAndTopicIdAndSubtopicId(User user, String courseId, String topicId, String subtopicId);
}
