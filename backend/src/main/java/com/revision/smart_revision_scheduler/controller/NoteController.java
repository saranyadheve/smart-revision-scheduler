package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.model.Note;
import com.revision.smart_revision_scheduler.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteRepository noteRepository;

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes() {
        return ResponseEntity.ok(noteRepository.findAll());
    }

    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<Note>> getNotesBySubject(@PathVariable String subject) {
        return ResponseEntity.ok(noteRepository.findBySubject(subject));
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        if (note == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(noteRepository.save(note));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        if (id != null) {
            noteRepository.deleteById(id);
        }
        return ResponseEntity.ok().build();
    }
}
