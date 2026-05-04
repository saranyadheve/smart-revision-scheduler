# Smart Adaptive Revision Scheduler 🧠

A state-of-the-art full-stack platform for intelligent revision scheduling and AI-driven study assistance. The system uses machine learning to predict student fatigue and optimize learning intervals.

## 🚀 Core Features
- **AI Study Assistant**: A strict, persona-based AI tutor for UPSC, GATE, TNPSC, and IT preparation.
- **Adaptive Scheduling**: Automatically schedules your next revision based on a real-time fatigue score (Random Forest).
- **Global Intel Hub**: Content generation pipeline for study materials.
- **Visual Learning Engine**: Modern UI with glassmorphic aesthetics and micro-animations.

## 📁 Architecture
- **Frontend** (React + Vite): `http://localhost:5173`
- **Backend** (Spring Boot + Security): `http://localhost:8081`
- **AI Service** (Python FastAPI + Scikit-Learn): `http://localhost:8000`

## ⚙️ Prerequisites
- Java 21+
- Node.js 18+
- Python 3.10+
- MySQL 8.0

## 🛠️ Setup & Execution

### 1. AI Service (Port 8000)
```bash
cd ai-service
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 2. Backend (Port 8081)
Ensure MySQL is running and your `application.properties` is configured correctly.
```bash
cd backend
.\mvnw.cmd spring-boot:run
```

### 3. Frontend (Port 5173)
```bash
cd frontend
npm install
npm run dev
```

## 🔒 Security & Auth
The system uses JWT-based authentication. All API requests (except `/api/auth/**`) require a valid `Bearer` token.
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login` (Returns JWT)

---
*Engineered for Excellence • Empowering the Future of Education*
