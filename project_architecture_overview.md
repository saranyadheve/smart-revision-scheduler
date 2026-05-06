# Smart Revision Scheduler: Technical Architecture & Core Algorithms

This document provides a comprehensive breakdown of the Smart Revision Scheduler platform, detailing the technologies used, the custom algorithms created, and what makes this system unique compared to traditional learning applications.

---

## 1. Frontend Architecture

**Technology Stack:** React.js (Vite), Tailwind CSS, Framer Motion, Context API.

**How it was created:**
The frontend was built to feel more like a high-end dashboard or a video game interface rather than a traditional, boring study app. It heavily utilizes modern web design principles like **glassmorphism**, dynamic gradients, and micro-animations to keep students engaged.

**What makes it unique?**
*   **Context-Aware UI:** The entire interface dynamically shifts depending on the student's selected track (UPSC, GATE, TNPSC, or IT Interview).
*   **Visual Gamification:** Instead of standard progress bars, the UI uses SVG circular gauges (Neural Precision), heatmap activity calendars (Consistency Maps), and dynamic streak counters to gamify the learning experience.
*   **Framer Motion:** Every interaction—from opening the AI Study Room to completing a task—is smoothed out with physical spring animations, reducing cognitive friction.

---

## 2. Backend Architecture

**Technology Stack:** Java 17, Spring Boot, Spring Data JPA, JWT (JSON Web Tokens).

**How it was created:**
The backend serves as a robust API gateway and business logic processor. It handles user authentication, session logging, and database operations. It acts as the "middleman" between the React frontend and the Python AI Engine.

**What makes it unique?**
*   **Microservice Orchestration:** Instead of cramming all AI logic into Java, the backend is designed to communicate with a dedicated Python server (`http://localhost:8000`) for heavy machine learning computations.
*   **Graceful Degradation:** If the Python AI server goes offline, the Java backend has a built-in "Heuristic Fallback Algorithm." It automatically switches to rule-based mathematical scoring so the user experience never breaks.

---

## 3. AI Chatbot (AstraMind)

**Algorithms Used:** Natural Language Processing (Jaccard Similarity) & Rule-Based Persona Engines.

**How it works:**
The chatbot (internally coded as `KissaraService`) does not rely on expensive, latency-heavy external LLMs (like OpenAI GPT-4) for every single query. Instead, it uses a hybrid approach:
1.  **Similarity Matching:** When a user asks a question, the system uses a **Word Overlap Algorithm**. It breaks down the query into a set of words, compares it against a massive local JSON Knowledge Base of FAQs, and calculates the intersection ratio. If similarity is > 70%, it serves an instant, highly accurate response.
2.  **Persona Fallback:** If the question is entirely new, it uses a rule-based generative approach to respond as a strict "Persona" based on the student's track (e.g., answering from the perspective of a strict GATE professor or a UPSC strategist).

**What makes it unique?**
It provides an **offline-capable, zero-latency** AI experience that is hyper-focused on the specific syllabus, completely preventing AI "hallucinations" (where AI invents fake facts), which is critical for competitive exams.

---

## 4. Fatigue Detection & Smart Scheduling

**Algorithms Used:** Machine Learning - Ensemble Learning (**Random Forest Classifier & Regressor** via Scikit-Learn in Python).

**How it works:**
This is the core "brain" of the project. When a student logs a study session, the Java backend collects 4 metrics:
*   `frequency`: How many times they've studied this topic.
*   `gap_days`: Days since they last looked at it.
*   `duration_minutes`: How long the current session lasted.
*   `difficulty`: The self-reported difficulty level (1-5).

The Python API takes these variables and feeds them into a **Random Forest** model. The model calculates the exact probability of cognitive burnout (Fatigue Score). 

The backend then uses this score to manipulate the calendar:
*   **Fatigue > 70%:** The system enforces a break, scheduling the next revision for **+2 days**.
*   **Fatigue > 40%:** The system detects moderate strain, scheduling it for **Tomorrow**.
*   **Fatigue < 40%:** The brain is fresh, the system schedules an immediate short-term review **Today**.

**Why is this uniquely powerful?**
*   **Evolution Beyond Spaced Repetition:** Traditional Spaced Repetition algorithms (like the SM-2 algorithm used by *Anki*) assume humans are machines. They calculate mathematical decay curves for memory. 
*   **Human-Centric Optimization:** Your project flips this concept. It prioritizes **mental fatigue over memory decay**. It actively prevents students from burning out by dynamically pushing deadlines away when it detects cognitive overload. It doesn't just manage *when* to study, it manages the student's *mental energy*.
