import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle
import os

MODEL_PATH = "fatigue_model.pkl"

class FatigueModel:
    def __init__(self):
        self.model = None

    def generate_synthetic_data(self, n_samples=1000):
        # Features: Frequency (1-10), Gap Days (0-30), Duration (10-180 min), Difficulty (1-10)
        data = {
            'frequency': np.random.randint(1, 10, n_samples),
            'gap_days': np.random.randint(0, 30, n_samples),
            'duration_minutes': np.random.randint(10, 180, n_samples),
            'difficulty': np.random.randint(1, 11, n_samples)
        }
        df = pd.DataFrame(data)
        
        # Rule-based Labeling for Training
        # Fatigue = 1 if (Freq > 7 AND Gap < 2) OR (Duration > 90 AND Difficulty > 7)
        conditions = [
            (df['frequency'] > 7) & (df['gap_days'] < 2),
            (df['duration_minutes'] > 90) & (df['difficulty'] > 7)
        ]
        choices = [1, 1]
        df['fatigue_label'] = np.select(conditions, choices, default=0)
        
        return df

    def train(self):
        print("Generating synthetic data...")
        df = self.generate_synthetic_data()
        X = df[['frequency', 'gap_days', 'duration_minutes', 'difficulty']]
        y = df['fatigue_label']

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X_train, y_train)
        
        accuracy = self.model.score(X_test, y_test)
        print(f"Model Trained. Accuracy: {accuracy:.2f}")
        
        with open(MODEL_PATH, 'wb') as f:
            pickle.dump(self.model, f)

    def load(self):
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, 'rb') as f:
                self.model = pickle.load(f)
        else:
            print("Model not found. Training new model...")
            self.train()

    def predict(self, frequency, gap_days, duration, difficulty):
        if self.model is None:
            self.load()
        
        # Predict probability of fatigue (class 1)
        prob = self.model.predict_proba([[frequency, gap_days, duration, difficulty]])[0][1]
        return prob

SESSION_MODEL_PATH = "session_fatigue_model.pkl"

class SessionFatigueModel:
    def __init__(self):
        self.model = None

    def generate_synthetic_data(self, n_samples=1000):
        # Features: study_duration (10-180 min), break_duration (0-60 min), focus_level (1-10)
        data = {
            'study_duration': np.random.randint(10, 180, n_samples),
            'break_duration': np.random.randint(0, 60, n_samples),
            'focus_level': np.random.randint(1, 11, n_samples)
        }
        df = pd.DataFrame(data)
        
        # Rule-based Labeling for Training
        # Simulate fatigue level (0.0 to 1.0)
        # Fatigue is higher with longer study, lower break, and lower focus
        df['fatigue_level'] = (df['study_duration'] / 180.0 * 0.5) + \
                              ((60 - df['break_duration']) / 60.0 * 0.3) + \
                              ((10 - df['focus_level']) / 10.0 * 0.2)
        
        # Ensure values are strictly within [0, 1]
        df['fatigue_level'] = df['fatigue_level'].clip(0.0, 1.0)
        
        return df

    def train(self):
        print("Generating synthetic data for Session Model...")
        df = self.generate_synthetic_data()
        X = df[['study_duration', 'break_duration', 'focus_level']]
        y = df['fatigue_level']

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        from sklearn.ensemble import RandomForestRegressor
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.model.fit(X_train, y_train)
        
        score = self.model.score(X_test, y_test)
        print(f"Session Model Trained. R^2 Score: {score:.2f}")
        
        with open(SESSION_MODEL_PATH, 'wb') as f:
            pickle.dump(self.model, f)

    def load(self):
        if os.path.exists(SESSION_MODEL_PATH):
            with open(SESSION_MODEL_PATH, 'rb') as f:
                self.model = pickle.load(f)
        else:
            print("Session Model not found. Training new model...")
            self.train()

    def predict(self, study_duration, break_duration, focus_level):
        if self.model is None:
            self.load()
        
        # Predict fatigue level
        fatigue = self.model.predict([[study_duration, break_duration, focus_level]])[0]
        
        # Heuristic for suggest break duration (in minutes) based on predicted fatigue and study duration
        # Example heuristic: Base break of 5 mins + 15 mins * fatigue level
        suggested_break = 5 + int(15 * fatigue)
        # If studying for a really long time, add more break time
        if study_duration > 60:
            suggested_break += 5
        if study_duration > 120:
            suggested_break += 10
            
        # Cap break duration at 45 minutes
        suggested_break = min(suggested_break, 45)
        
        return float(fatigue), int(suggested_break)
