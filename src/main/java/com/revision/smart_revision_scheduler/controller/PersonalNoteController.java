package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.model.PersonalNote;
import com.revision.smart_revision_scheduler.model.User;
import com.revision.smart_revision_scheduler.repository.PersonalNoteRepository;
import com.revision.smart_revision_scheduler.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personal-notes")
@RequiredArgsConstructor
@Slf4j
public class PersonalNoteController {

    private final PersonalNoteRepository noteRepository;
    private final UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PersonalNote>> getNotes(@PathVariable Long userId) {
        log.info("Fetching notes for user: {}", userId);
        User user = userRepository.findById(userId).orElseThrow();
        return ResponseEntity.ok(noteRepository.findByUserOrderByUpdatedAtDesc(user));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<PersonalNote> createNote(@PathVariable Long userId, @RequestBody PersonalNote request) {
        log.info("Creating note for user: {} - Title: {}", userId, request.getTitle());
        User user = userRepository.findById(userId).orElseThrow();
        request.setUser(user);
        return ResponseEntity.ok(noteRepository.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonalNote> updateNote(@PathVariable Long id, @RequestBody PersonalNote request) {
        log.info("Updating note ID: {}", id);
        PersonalNote existingNote = noteRepository.findById(id).orElseThrow();
        existingNote.setTitle(request.getTitle());
        existingNote.setContent(request.getContent());
        return ResponseEntity.ok(noteRepository.save(existingNote));
    }

    @PostMapping("/remove-forever/{id}")
    public ResponseEntity<String> removeForever(@PathVariable("id") Long id) {
        log.info("FORCE DELETE INITIATED: Archive ID: {}", id);
        try {
            if (noteRepository.existsById(id)) {
                noteRepository.deleteById(id);
                log.info("ID: {} successfully purged from the system.", id);
                return ResponseEntity.ok("Deleted");
            } else {
                log.warn("Attempted to purge ID: {} but it was already gone.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Failed to delete note {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
