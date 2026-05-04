from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from model import FatigueModel, SessionFatigueModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import uuid
import os
from fastapi.staticfiles import StaticFiles
from generator import AIContentGenerator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = FatigueModel()
session_model = SessionFatigueModel()

# Load or train model on startup
model.load()
session_model.load()

# Persistence for Job Status
jobs = {}
current_dir = os.path.dirname(os.path.abspath(__file__))
static_dir = os.path.join(current_dir, "static")
generated_dir = os.path.join(static_dir, "generated")

os.makedirs(generated_dir, exist_ok=True)
generator = AIContentGenerator(output_dir=generated_dir, static_dir=static_dir)

# Mount Static Files
app.mount("/static", StaticFiles(directory=static_dir), name="static")

class PredictionRequest(BaseModel):
    frequency: int
    gap_days: int
    duration_minutes: int
    difficulty: int

class SessionPredictionRequest(BaseModel):
    study_duration: int
    break_duration: int
    focus_level: int

class GenerateRequest(BaseModel):
    topicId: int
    title: str
    summary: str

async def process_media_job(job_id: str, topic_id: int, title: str, summary: str):
    jobs[job_id]["status"] = "PROCESSING"
    try:
        result = await generator.run_pipeline(topic_id, title, summary)
        jobs[job_id]["status"] = "COMPLETED"
        jobs[job_id]["result"] = result
    except Exception as e:
        print(f"Job {job_id} failed: {e}")
        jobs[job_id]["status"] = "FAILED"
        jobs[job_id]["error"] = str(e)

@app.get("/")
def read_root():
    return {"message": "AI Service is Running"}

@app.post("/generate-content")
async def start_generation(request: GenerateRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "PENDING", "progress": 0}
    background_tasks.add_task(process_media_job, job_id, request.topicId, request.title, request.summary)
    return {"jobId": job_id}

@app.get("/job-status/{job_id}")
async def get_job_status(job_id: str):
    if job_id not in jobs:
        return {"status": "NOT_FOUND"}
    return jobs[job_id]

@app.post("/predict-fatigue")
def predict_fatigue(request: PredictionRequest):
    probability = model.predict(
        request.frequency, 
        request.gap_days, 
        request.duration_minutes, 
        request.difficulty
    )
    return {"fatigue_score": probability}

@app.post("/predict-session")
def predict_session(request: SessionPredictionRequest):
    fatigue_level, suggested_break = session_model.predict(
        request.study_duration,
        request.break_duration,
        request.focus_level
    )
    return {
        "fatigue_level": fatigue_level,
        "suggested_break_duration": suggested_break
    }

@app.post("/retrain")
def retrain_model():
    model.train()
    session_model.train()
    return {"message": "Models retrained successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
