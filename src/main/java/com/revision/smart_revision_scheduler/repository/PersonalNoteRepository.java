package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.model.PersonalNote;
import com.revision.smart_revision_scheduler.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonalNoteRepository extends JpaRepository<PersonalNote, Long> {
    List<PersonalNote> findByUser(User user);
    List<PersonalNote> findByUserOrderByUpdatedAtDesc(User user);
}
