package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    // Basic CRUD is enough for now
}
