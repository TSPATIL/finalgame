import sys
import json
import numpy as np
from hmmlearn import hmm

# Load user data from Node.js
result_data = json.loads(sys.argv[1])

# Define states (difficulty levels)
states = ["easy", "medium", "hard"]
state_map = {"easy": 0, "medium": 1, "hard": 2}

# Define observations (Time Taken & Attempts)
observations = [
    "Short, Few", "Short, Moderate", "Short, Many",
    "Medium, Few", "Medium, Moderate", "Medium, Many",
    "Long, Few", "Long, Moderate", "Long, Many"
]
n_observations = len(observations)

# Convert user history to numerical format
difficulty_history = [state_map[d] for d in result_data["difficultyHistory"]]

# Define time & attempts categories
def categorize_time(time_ms):
    if time_ms <= 120000:
        return 0  # Short
    elif time_ms <= 180000:
        return 1  # Medium
    else:
        return 2  # Long

def categorize_attempts(attempts):
    if attempts <= 2:
        return 0  # Few
    elif attempts <= 5:
        return 1  # Moderate
    else:
        return 2  # Many

# Convert time & attempts into observations
obs_sequence = [
    3 * categorize_time(result_data["timeTaken"][i]) + categorize_attempts(result_data["attempts"][i])
    for i in range(len(result_data["timeTaken"]))
]

# Transition probabilities (probability of moving from one difficulty to another)
transition_matrix = np.array([
    [0.65, 0.30, 0.05],  # Easy → Easy, Medium, Hard
    [0.20, 0.55, 0.25],  # Medium → Easy, Medium, Hard
    [0.10, 0.40, 0.50]   # Hard → Easy, Medium, Hard
])

# Emission probabilities (likelihood of an observation given a difficulty level)
emission_matrix = np.array([
    [0.50, 0.25, 0.05, 0.10, 0.05, 0.03, 0.02, 0.00, 0.00],  # Easy
    [0.05, 0.15, 0.10, 0.25, 0.25, 0.10, 0.05, 0.03, 0.02],  # Medium
    [0.00, 0.03, 0.05, 0.10, 0.20, 0.25, 0.15, 0.12, 0.10]   # Hard
])

# Initial state probabilities
start_probabilities = np.array([0.7, 0.2, 0.1])  # Most users start with Easy

# Create and train HMM Model
model = hmm.MultinomialHMM(n_components=3, n_iter=100)
model.startprob_ = start_probabilities
model.transmat_ = transition_matrix
model.emissionprob_ = emission_matrix

obs_sequence = np.array([[obs] for obs in obs_sequence])  # Convert to 2D array

# Fit the model (if training with more data)
model.fit(obs_sequence)

# Predict next difficulty
log_prob, state_seq = model.decode(obs_sequence, algorithm="viterbi")
predicted_difficulty = states[state_seq[-1]]

# Return the result in JSON format
response = {"nextDifficulty": predicted_difficulty}
print(json.dumps(response))
