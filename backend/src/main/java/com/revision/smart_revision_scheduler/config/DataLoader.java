package com.revision.smart_revision_scheduler.config;

import com.revision.smart_revision_scheduler.model.*;
import com.revision.smart_revision_scheduler.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final NoteRepository noteRepository;
    private final QuestionRepository questionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Seed Admin
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setEmail("admin@smartrevise.com");
            admin.setLastLogin(LocalDateTime.now());
            userRepository.save(admin);

            // Seed User
            User user = new User();
            user.setUsername("scholar");
            user.setPassword(passwordEncoder.encode("pass123"));
            user.setRole(Role.USER);
            user.setEmail("scholar@demo.com");
            user.setLastLogin(LocalDateTime.now().minusHours(5));
            userRepository.save(user);

            // Seed Notes
            Note n1 = createNote("Mughal Architecture", "UPSC", "https://ncert.nic.in/textbook/pdf/lehs204.pdf", "Indo-Islamic architectural study.", admin);
            Note n2 = createNote("Memory Management", "GATE", "https://www.cl.cam.ac.uk/teaching/1011/OpSystems/os-notes.pdf", "Paging and Virtual Memory.", admin);
            Note n3 = createNote("Indian Penal Code 1860", "IPS", "https://legislative.gov.in/sites/default/files/A1860-45.pdf", "Foundational criminal law of India.", admin);
            Note n4 = createNote("System Design Interview", "IT", "https://github.com/donnemartin/system-design-primer", "Scaling and high availability patterns.", admin);

            noteRepository.saveAll((Iterable<Note>) Arrays.asList(n1, n2, n3, n4));

            // Seed Questions
            Question q1 = createQuestion("Who founded the Mughal Dynasty?", "Akbar", "Babur", "Humayun", "Shah Jahan", "B", "UPSC", 2);
            Question q2 = createQuestion("What is used for Real-Time Scheduling?", "Round Robin", "Priority Scheduling", "FIFO", "SJF", "B", "GATE", 4);
            Question q3 = createQuestion("Section 302 of IPC deals with?", "Theft", "Fraud", "Murder", "Assault", "C", "IPS", 3);
            Question q4 = createQuestion("What does CAP Theorem stand for?", "Consistency, Availability, Partition", "Cache, API, Port", "Code, App, Plan", "Compute, Allied, Page", "A", "IT", 5);

            questionRepository.saveAll((Iterable<Question>) Arrays.asList(q1, q2, q3, q4));
            
            System.out.println("Database fully seeded with Admin, Demo User, Notes, and Questions.");
        }
    }

    private Note createNote(String title, String subject, String url, String desc, User user) {
        Note n = new Note();
        n.setTitle(title);
        n.setSubject(subject);
        n.setPdfUrl(url);
        n.setDescription(desc);
        n.setUploadedBy(user);
        n.setCreatedAt(LocalDateTime.now());
        return n;
    }

    private Question createQuestion(String content, String a, String b, String c, String d, String correct, String cat, int diff) {
        Question q = new Question();
        q.setContent(content);
        q.setOptionA(a); q.setOptionB(b); q.setOptionC(c); q.setOptionD(d);
        q.setCorrectAnswer(correct);
        q.setCategory(cat);
        q.setDifficultyLevel(diff);
        return q;
    }
}
