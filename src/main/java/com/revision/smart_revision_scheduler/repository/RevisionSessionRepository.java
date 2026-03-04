package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.model.RevisionSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RevisionSessionRepository extends JpaRepository<RevisionSession, Long> {
    // Basic CRUD is enough for now
}
