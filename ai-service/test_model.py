from model import FatigueModel

print("Initializing Model...")
model = FatigueModel()
print("Training Model...")
model.train()
print("Testing Prediction...")
prob = model.predict(frequency=8, gap_days=1, duration_minutes=30, difficulty=5)
print(f"Prediction for Freq=8, Gap=1: {prob}")
prob2 = model.predict(frequency=2, gap_days=10, duration_minutes=30, difficulty=5)
print(f"Prediction for Freq=2, Gap=10: {prob2}")
 