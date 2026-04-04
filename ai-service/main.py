from fastapi import FastAPI
from pydantic import BaseModel
from model import FatigueModel, SessionFatigueModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

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

class PredictionRequest(BaseModel):
    frequency: int
    gap_days: int
    duration_minutes: int
    difficulty: int

class SessionPredictionRequest(BaseModel):
    study_duration: int
    break_duration: int
    focus_level: int

@app.get("/")
def read_root():
    return {"message": "AI Service is Running"}

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
