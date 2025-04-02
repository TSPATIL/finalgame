from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

app = Flask(__name__)

# Possible values
attempts = list(range(1, 11))  # Expanded attempt range
time_taken_ms = list(range(5000, 105000, 5000))  # More granular time range
difficulties = ['easy', 'medium', 'hard']

# Categorization function
def categorize_attempts(attempts):
    if attempts <= 2:
        return "Few"
    elif 3 <= attempts <= 5:
        return "MediumFew"
    else:
        return "Many"

def categorize_time(time):
    if time < 30000:
        return "Short"
    elif 30000 <= time < 70000:
        return "Medium"
    else:
        return "Long"

# Generate rule-based dataset
data = []
for prev_difficulty in difficulties:
    for attempt in attempts:
        for time in time_taken_ms:
            attempt_category = categorize_attempts(attempt)
            time_category = categorize_time(time)
            
            if attempt_category == "Few" and time_category == "Short":
                next_difficulty = 'hard'
            elif attempt_category == "Many" and time_category == "Long":
                next_difficulty = 'easy'
            else:
                next_difficulty = 'medium'
            
            data.append([attempt, time, prev_difficulty, next_difficulty])

# Convert to DataFrame
df = pd.DataFrame(data, columns=['attempts', 'time_taken_ms', 'prev_difficulty', 'next_difficulty'])

# Encode categorical variable
label_encoder = LabelEncoder()
df['prev_difficulty'] = label_encoder.fit_transform(df['prev_difficulty'])
df['next_difficulty'] = label_encoder.fit_transform(df['next_difficulty'])

# Features and target
X = df[['attempts', 'time_taken_ms', 'prev_difficulty']]
y = df['next_difficulty']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Rule-based prediction function
def predict_next_difficulty(attempts, time_taken_ms, prev_difficulty):
    attempt_category = categorize_attempts(attempts)
    time_category = categorize_time(time_taken_ms)
    
    if attempt_category == "Few" and time_category == "Short":
        return 'hard'
    elif attempt_category == "Many" and time_category == "Long":
        return 'easy'
    else:
        return 'medium'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    attempts = data.get("attempts")
    time_taken_ms = data.get("time_taken_ms")
    difficulty = data.get("difficulty")
    
    if attempts is None or time_taken_ms is None or difficulty is None:
        return jsonify({"error": "Missing data"}), 400

    difficulty = predict_next_difficulty(attempts, time_taken_ms, difficulty)
    return jsonify({"next_difficulty": difficulty})

if __name__ == '__main__':
    app.run(debug=True)