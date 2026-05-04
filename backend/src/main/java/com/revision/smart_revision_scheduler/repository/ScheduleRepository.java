package com.revision.smart_revision_scheduler.repository;

import java.util.Optional;
import com.revision.smart_revision_scheduler.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByRevisionDateBeforeAndReminderSentFalse(LocalDate date);
    List<Schedule> findByRevisionDateAndReminderSentFalse(LocalDate date);
    Optional<Schedule> findTopByRevisionSessionUserOrderByRevisionDateDesc(com.revision.smart_revision_scheduler.model.User user);
}
