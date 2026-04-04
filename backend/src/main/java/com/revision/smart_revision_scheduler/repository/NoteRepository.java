package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findBySubject(String subject);
}
