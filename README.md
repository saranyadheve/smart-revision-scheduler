# Smart Adaptive Revision Scheduler

A full-stack academic project for intelligent revision scheduling using Spring Boot and AI.

## Project Structure
- `smart-revision-scheduler` (Backend): Spring Boot application.
- `ai-service` (AI Module): Python FastAPI application with Scikit-Learn.

## Prerequisites
- Java 17+
- Maven
- Python 3.9+

## Setup & Running

### 1. AI Service (Python)
The AI service provides fatigue detection and must be running for the backend to work.

```bash
cd ai-service
pip install -r requirements.txt
python main.py
```
*Runs on http://localhost:8000*

### 2. Backend (Spring Boot)
The backend handles user management, data storage, and scheduling logic.

```bash
cd smart-revision-scheduler
./mvnw clean spring-boot:run
```
*Runs on http://localhost:8080*

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login

### Revisions
- `POST /api/revisions` - Log a study session (topic, duration, difficulty)
- `GET /api/revisions/user/{userId}` - Get history

### Schedule
- `GET /api/schedule/generate?userId={id}&topic={topic}&difficulty={diff}` - Generate next revision time (Calls AI)

## Features
- **AI Fatigue Detection**: Uses Random Forest to predict fatigue based on frequency, gap, duration, and difficulty.
- **Adaptive Scheduling**: Adjusts revision intervals based on fatigue score.
- **H2 Database**: In-memory database for easy development (configured in `application.properties`).
