const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const db = require('./db');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const DEFAULT_PROMPT = "You are a helpful study assistant. Provide clear, accurate, and concise information.";

const SYSTEM_PROMPTS = {
    upsc: "You are an expert UPSC mentor. Focus on conceptual clarity, current affairs integration, and answer writing structure for Civil Services preparation.",
    tnpsc: "You are an expert TNPSC coach. Focus on Tamil Nadu specific facts, history, and administration relevant to Group 1 and 2 exams.",
    gate: "You are a specialized GATE professor. Focus on technical accuracy, engineering mathematics, and problem-solving techniques for core engineering branches.",
    it: "You are a senior IT interviewer. Focus on coding best practices, system design, and technical interview preparation for software roles."
};

// --- Personal Notes API ---

/**
 * GET /api/notes/user/:userId
 */
app.get('/api/notes/user/:userId', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT id, title, content, user_id, created_at AS createdAt, updated_at AS updatedAt FROM personal_notes WHERE user_id = ? ORDER BY updated_at DESC',
            [req.params.userId]
        );
        res.json(rows);
    } catch (error) {
        console.error("Fetch Notes Error [Detailed]:", {
            message: error.message,
            code: error.code,
            sql: error.sql
        });
        res.status(500).json({ error: "Failed to fetch notes.", details: error.message });
    }
});

/**
 * POST /api/notes/user/:userId
 */
app.post('/api/notes/user/:userId', async (req, res) => {
    const { title, content } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO personal_notes (title, content, user_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
            [title, content, req.params.userId]
        );
        // Fetch the newly created note to return the full object with timestamps
        const [rows] = await db.execute('SELECT id, title, content, created_at AS createdAt, updated_at AS updatedAt FROM personal_notes WHERE id = ?', [result.insertId]);
        res.json(rows[0]);
    } catch (error) {
        console.error("Create Note Error [Detailed]:", {
            message: error.message,
            code: error.code,
            sql: error.sql
        });
        res.status(500).json({ error: "Failed to create note.", details: error.message });
    }
});

/**
 * PUT /api/notes/:id
 */
app.put('/api/notes/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        await db.execute(
            'UPDATE personal_notes SET title = ?, content = ?, updated_at = NOW() WHERE id = ?',
            [title, content, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        console.error("Update Note Error:", error);
        res.status(500).json({ error: "Failed to update note." });
    }
});

/**
 * DELETE /api/notes/:id
 * Functionality: Accept note ID, find in DB, delete, return success message.
 */
app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // 1. Validate ID (Check if exists)
        const [rows] = await db.execute('SELECT * FROM personal_notes WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            // If note not found
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        // 2. Delete from database
        await db.execute('DELETE FROM personal_notes WHERE id = ?', [id]);

        // 3. Return success response (As requested in template)
        res.json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        // 4. Handle errors properly
        console.error("Delete Note Error:", error);
        res.status(500).json({ success: false, message: "Failed to delete note. Try again." });
    }
});

/**
 * POST /api/ai/chat
 * Body: { module: string, course: string, message: string }
 */
app.post('/api/ai/chat', async (req, res) => {
    const { message } = req.body;
    const module = req.body.module || req.body.course; // Support both alias

    // 1. Basic Validation
    if (!message || message.trim() === "") {
        return res.status(400).json({ error: "Message content is required." });
    }

    if (!module) {
        return res.status(400).json({ error: "Module type is required (upsc, tnpsc, gate, it)." });
    }

    try {
        // 2. Select System Prompt
        const modKey = module.toLowerCase();
        let systemPrompt = SYSTEM_PROMPTS[modKey] || DEFAULT_PROMPT;
        
        // Add branch-specific context if available in request body
        const branch = req.body.branch;
        if (branch) {
            systemPrompt += ` Specifically focus on the context of ${branch.toUpperCase()}.`;
        }

        // 3. Generate Suggestions (Local Logic)
        const suggestions = [];
        if (modKey.includes("upsc")) {
            suggestions.push("UPSC syllabus", "Preparation strategy", "How many stages in UPSC?");
        } else if (modKey.includes("tnpsc")) {
            suggestions.push("Group 4 syllabus", "Current Affairs", "What is TNPSC?");
        } else if (modKey.includes("gate")) {
            suggestions.push("GATE syllabus", "Aptitude for GATE", "Validity of score");
        } else {
            suggestions.push("DSA important topics", "System Design basics", "Deadlock in OS");
        }

        // 4. Try Local Knowledge Base first to save API quota
        const localKB = [
            { course: "upsc", q: "what is upsc", a: "The Union Public Service Commission (UPSC) is India's premier central recruiting agency responsible for appointments to and examinations for All India services and group A & group B of Central services." },
            { course: "upsc", q: "upsc syllabus", a: "UPSC Civil Services Examination consists of 3 stages: 1. Preliminary Examination (Objective), 2. Main Examination (Written), and 3. Personality Test (Interview)." },
            { course: "tnpsc", q: "what is tnpsc", a: "The Tamil Nadu Public Service Commission (TNPSC) is responsible for governing the recruitment of personnel into the state's public service." },
            { course: "gate", q: "what is gate", a: "Graduate Aptitude Test in Engineering (GATE) tests the comprehensive understanding of various undergraduate subjects in engineering and science for admission into Masters Programs and PSUs." },
            { course: "it", q: "deadlock", a: "A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process." }
        ];

        const match = localKB.find(item => 
            modKey.includes(item.course) && 
            (message.toLowerCase().includes(item.q) || item.q.includes(message.toLowerCase()))
        );

        if (match) {
            console.log(`[AI] Local Match Found: ${match.q}`);
            return res.json({ reply: match.a, suggestions });
        }

        // 5. call Gemini directly via fetch (gemini-flash-latest is usually 1.5-flash)
        const GENIMNI_MODEL = "gemini-flash-latest";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${GENIMNI_MODEL}:generateContent?key=${process.env.OPENAI_API_KEY}`;
        
        const geminiResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    { role: "user", parts: [{ text: systemPrompt + "\n\nUser Message: " + message }] }
                ]
            })
        });

        if (!geminiResponse.ok) {
            const errData = await geminiResponse.json();
            throw new Error(`Gemini API Error: ${errData.error?.message || geminiResponse.statusText}`);
        }

        const data = await geminiResponse.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
        res.json({ reply, suggestions });

    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ 
            error: "Failed to fetch AI response.",
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: "ok", service: "AI Study Assistant Backend" });
});

app.listen(PORT, () => {
    console.log(`AI Study Assistant Backend running on http://localhost:${PORT}`);
});
