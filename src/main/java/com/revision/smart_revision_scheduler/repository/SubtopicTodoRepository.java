package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.model.SubtopicTodo;
import com.revision.smart_revision_scheduler.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubtopicTodoRepository extends JpaRepository<SubtopicTodo, Long> {
    List<SubtopicTodo> findByUser(User user);
    List<SubtopicTodo> findByUserOrderByCreatedAtDesc(User user);
}
