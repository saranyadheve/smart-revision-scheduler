package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.entity.PersonalNoteEntity;
import com.revision.smart_revision_scheduler.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PersonalNoteRepository extends JpaRepository<PersonalNoteEntity, Long> {
    List<PersonalNoteEntity> findByUser(User user);
}
