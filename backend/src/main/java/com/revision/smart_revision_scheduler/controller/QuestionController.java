package com.revision.smart_revision_scheduler.controller;

import com.revision.smart_revision_scheduler.model.Question;
import com.revision.smart_revision_scheduler.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionRepository questionRepository;

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionRepository.findAll());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category) {
        List<Question> questions = questionRepository.findByCategory(category);
        Collections.shuffle(questions); // Randomize order for quiz
        return ResponseEntity.ok(questions);
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        if (question == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(questionRepository.save(question));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        if (id != null) {
            questionRepository.deleteById(id);
        }
        return ResponseEntity.ok().build();
    }
}
