
# import json
# import sys
# import numpy as np
# import matplotlib.pyplot as plt
# import seaborn as sns
# from hmmlearn import hmm



# def map_observations(time_taken, attempts):
#     observations = ["Short-Few", "Short-MediumFew", "Short-Many", "Medium-Few", "Medium-MediumFew", "Medium-Many", "Long-Few", "Long-MediumFew", "Long-Many"]
#     result = []
#     for time, attempt in zip(time_taken, attempts):
#         time_category = ""
#         attempt_category = ""
#         if time < 100:
#             time_category = "Short"
#         elif 100 <= time < 250:
#             time_category = "Medium"
#         else:
#             time_category = "Long"
#         if attempt <= 2:
#             attempt_category = "Few"
#         elif 2 < attempt <= 4:
#             attempt_category = "MediumFew"
#         else:
#             attempt_category = "Many"
#         observation = f"{time_category}-{attempt_category}"
#         result.append(observations.index(observation))
#     # print(json.dumps(result))
#     return result

# if __name__ == "__main__":
#   try:
#     data = json.loads(sys.argv[1])
#     time_taken = data['time_taken']
#     attempts = data['attempts']
#     observations_sequence = map_observations(time_taken, attempts)
        
#     # Define the state space (game levels)
#     states = ["Easy", "Medium", "Hard"]
#     n_states = len(states)

#     # Define the observation space (time spent, attempts taken)
#     observations = ["Short-Few", "Short-MediumFew", "Short-Many", "Medium-Few", "Medium-MediumFew", "Medium-Many", "Long-Few", "Long-MediumFew", "Long-Many"]
#     n_observations = len(observations)

#     # Define the initial state distribution (always start with 'Easy')
#     start_probability = np.array([0.6, 0.4, 0.0])

#     # Define the state transition probabilities
#     transition_probability = np.array([[0.3, 0.7, 0.0],
#                                         [0.1, 0.5, 0.4],
#                                         [0.1, 0.2, 0.7]])

#     # Define the emission probabilities (time, attempts)
#     emission_probability = np.array([[0.25, 0.15, 0.1, 0.2, 0.15, 0.1, 0.05, 0.0, 0.0],
#                                         # Easy: Short-Few, Short-MediumFew, Short-Many, Medium-Few, Medium-MediumFew, Medium-Many
#                                         [0.05, 0.1, 0.15, 0.15, 0.2, 0.2, 0.1, 0.05, 0.0],
#                                         # Medium: Short-MediumFew, Short-Many, Medium-Few, Medium-MediumFew, Medium-Many, Long-Few, Long-MediumFew
#                                         [0.0, 0.0, 0.05, 0.1, 0.15, 0.2, 0.2, 0.15, 0.15]])
#                                         # Hard: Medium-Many, Long-Few, Long-MediumFew, Long-Many

#     # Initialize the HMM model
#     model = hmm.CategoricalHMM(n_components=n_states)
#     model.startprob_ = start_probability
#     model.transmat_ = transition_probability
#     model.emissionprob_ = emission_probability
    
#     # Define a sequence of observed (time, attempts) pairs
#     # 0: Short-Few, 1: Short-MediumFew, 2: Short-Many, 3: Medium-Few, 4: Medium-MediumFew, 5: Medium-Many, 6: Long-Few, 7: Long-MediumFew, 8: Long-Many
#     observed_pairs = np.array(observations_sequence).reshape(-1, 1)  # Added an extra '8' to the end

#     # Define the threshold for "too long" (index for Long-MediumFew and Long-Many)
#     long_thresholds = [7, 8]  # Indices for 'Long-MediumFew' and 'Long-Many'

#     # Predict the most likely hidden states (difficulty levels)
#     predicted_levels = model.predict(observed_pairs)

#     # Apply the extra condition: Reset to 'Easy' if 'Long' time is encountered
#     for i, obs in enumerate(observed_pairs):
#         if obs[0] in long_thresholds:  # If the observation is 'Long-MediumFew' or 'Long-Many'
#             predicted_levels[i] = 0  # Force the state back to 'Easy'

#     # Map hidden states to difficulty levels
#     difficulty_mapping = {0: "Easy", 1: "Medium", 2: "Hard"}
#     mapped_levels = [difficulty_mapping[state] for state in predicted_levels]
#     print(json.dumps(mapped_levels))
#   except (json.JSONDecodeError, KeyError, IndexError) as e:
#     print(json.dumps({'error': str(e)}))
#     sys.exit(1)

# import json
# import sys
# import numpy as np
# from hmmlearn import hmm

# def map_observations(time_taken, attempts):
#     observations = ["Short-Few", "Short-MediumFew", "Short-Many", "Medium-Few", "Medium-MediumFew", "Medium-Many", "Long-Few", "Long-MediumFew", "Long-Many"]
#     result = []
#     for time, attempt in zip(time_taken, attempts):
#         time_category = ""
#         attempt_category = ""
#         if time < 100:
#             time_category = "Short"
#         elif 100 <= time < 250:
#             time_category = "Medium"
#         else:
#             time_category = "Long"
#         if attempt <= 2:
#             attempt_category = "Few"
#         elif 2 < attempt <= 4:
#             attempt_category = "MediumFew"
#         else:
#             attempt_category = "Many"
#         observation = f"{time_category}-{attempt_category}"
#         result.append(observations.index(observation))
#     return result

# if __name__ == "__main__":
#     try:
#         data = json.loads(sys.argv[1])
#         time_taken = data['time_taken']
#         attempts = data['attempts']
#         observations_sequence = map_observations(time_taken, attempts)

#         states = ["Easy", "Medium", "Hard"]
#         n_states = len(states)

#         observations = ["Short-Few", "Short-MediumFew", "Short-Many", "Medium-Few", "Medium-MediumFew", "Medium-Many", "Long-Few", "Long-MediumFew", "Long-Many"]
#         n_observations = len(observations)

#         start_probability = np.array([0.6, 0.4, 0.0])

#         transition_probability = np.array([[0.3, 0.7, 0.0],
#                                             [0.1, 0.5, 0.4],
#                                             [0.1, 0.2, 0.7]])

#         emission_probability = np.array([[0.25, 0.15, 0.1, 0.2, 0.15, 0.1, 0.05, 0.0, 0.0],
#                                             [0.05, 0.1, 0.15, 0.15, 0.2, 0.2, 0.1, 0.05, 0.0],
#                                             [0.0, 0.0, 0.05, 0.1, 0.15, 0.2, 0.2, 0.15, 0.15]])

#         model = hmm.CategoricalHMM(n_components=n_states, n_iter=100)
#         model.startprob_ = start_probability
#         model.transmat_ = transition_probability
#         model.emissionprob_ = emission_probability

#         observed_pairs = np.array(observations_sequence).reshape(-1, 1)

#         long_thresholds = [7, 8]

#         predicted_levels = model.predict(observed_pairs)

#         for i, obs in enumerate(observed_pairs):
#             if obs[0] in long_thresholds:
#                 predicted_levels[i] = 0
                
#         predicted_levels_list = predicted_levels.tolist()

#         print(json.dumps(predicted_levels_list))

#     except (json.JSONDecodeError, KeyError, IndexError) as e:
#         print(json.dumps({'error': str(e)}))
#         sys.exit(1)

# import json
# import sys
# import numpy as np
# from hmmlearn import hmm

# def map_observations(time_taken, attempts):
#     observations = ["Short-Few", "Short-MediumFew", "Short-Many", 
#                     "Medium-Few", "Medium-MediumFew", "Medium-Many", 
#                     "Long-Few", "Long-MediumFew", "Long-Many"]
    
#     result = []
#     for time, attempt in zip(time_taken, attempts):
#         if time < 100:
#             time_category = "Short"
#         elif 100 <= time < 250:
#             time_category = "Medium"
#         else:
#             time_category = "Long"
        
#         if attempt <= 2:
#             attempt_category = "Few"
#         elif 2 < attempt <= 4:
#             attempt_category = "MediumFew"
#         else:
#             attempt_category = "Many"

#         observation = f"{time_category}-{attempt_category}"
#         result.append(observations.index(observation))
    
#     # print("🔹 Mapped Observations:", result)  # Debugging output
#     return result

# if __name__ == "__main__":
#     try:
#         data = json.loads(sys.argv[1])
#         time_taken = data['time_taken']
#         attempts = data['attempts']
#         observations_sequence = map_observations(time_taken, attempts)

#         states = ["Easy", "Medium", "Hard"]
#         n_states = len(states)

#         observations = ["Short-Few", "Short-MediumFew", "Short-Many", 
#                         "Medium-Few", "Medium-MediumFew", "Medium-Many", 
#                         "Long-Few", "Long-MediumFew", "Long-Many"]

#         start_probability = np.array([0.3, 0.4, 0.3])  # Even distribution

#         transition_probability = np.array([[0.5, 0.3, 0.2],   # Adjusted for balance
#                                            [0.3, 0.4, 0.3],
#                                            [0.2, 0.3, 0.5]])

#         emission_probability = np.array([[0.2, 0.15, 0.1, 0.15, 0.15, 0.1, 0.1, 0.025, 0.025],
#                                          [0.1, 0.15, 0.2, 0.2, 0.15, 0.1, 0.05, 0.025, 0.025],
#                                          [0.05, 0.05, 0.1, 0.15, 0.2, 0.2, 0.15, 0.05, 0.05]])

#         model = hmm.CategoricalHMM(n_components=n_states, n_iter=100)
#         model.startprob_ = start_probability
#         model.transmat_ = transition_probability
#         model.emissionprob_ = emission_probability

#         observed_pairs = np.array(observations_sequence).reshape(-1, 1)
#         # print("🔹 Observed Pairs:", observed_pairs)  # Debugging output

#         # 🔥 Fit model before predicting 🔥
#         X_train = np.array(observations_sequence * 5).reshape(-1, 1)  # Repeat to simulate training data
#         lengths = [len(observations_sequence)] * 5
#         model.fit(X_train, lengths)

#         predicted_levels = model.predict(observed_pairs)
#         # print("🔹 Raw Predicted Levels:", predicted_levels)  # Debugging output

#         predicted_levels_list = predicted_levels.tolist()
#         print(json.dumps(predicted_levels_list))

#     except (json.JSONDecodeError, KeyError, IndexError) as e:
#         print(json.dumps({'error': str(e)}))

import json
import sys
import numpy as np
import math

def map_observations(time_taken, attempts):
    observations = ["Short-Few", "Short-MediumFew", "Short-Many", 
                    "Medium-Few", "Medium-MediumFew", "Medium-Many", 
                    "Long-Few", "Long-MediumFew", "Long-Many"]
    
    result = []
    for time, attempt in zip(time_taken, attempts):
        if time < 100:
            time_category = "Short"
        elif 100 <= time < 250:
            time_category = "Medium"
        else:
            time_category = "Long"
        
        if attempt <= 2:
            attempt_category = "Few"
        elif 2 < attempt <= 4:
            attempt_category = "MediumFew"
        else:
            attempt_category = "Many"

        observation = f"{time_category}-{attempt_category}"
        result.append(observations.index(observation))
    
    return result

def viterbi(obs, states, start_prob, trans_prob, emis_prob):
    n_states = len(states)
    n_obs = len(obs)

    # DP Table
    dp = np.zeros((n_states, n_obs))
    backpointer = np.zeros((n_states, n_obs), dtype=int)

    # Initialize first column
    for s in range(n_states):
        dp[s, 0] = start_prob[s] * emis_prob[s, obs[0]]
        backpointer[s, 0] = 0  # No backtracking at start

    # Fill DP Table
    for t in range(1, n_obs):
        for s in range(n_states):
            max_prob, max_state = max(
                (dp[prev_s, t - 1] * trans_prob[prev_s, s] * emis_prob[s, obs[t]], prev_s)
                for prev_s in range(n_states)
            )
            dp[s, t] = max_prob
            backpointer[s, t] = max_state

    # Backtrack to find the best sequence
    best_last_state = np.argmax(dp[:, -1])
    best_sequence = [best_last_state]
    
    for t in range(n_obs - 1, 0, -1):
        best_sequence.insert(0, backpointer[best_sequence[0], t])

    return best_sequence

if __name__ == "__main__":
    try:
        data = json.loads(sys.argv[1])
        time_taken = data['time_taken']
        attempts = data['attempts']
        observations_sequence = map_observations(time_taken, attempts)

        # Define HMM Parameters
        states = ["Easy", "Medium", "Hard"]
        n_states = len(states)

        start_probability = np.array([0.4, 0.4, 0.2])

        transition_probability = np.array([[0.5, 0.4, 0.1],  
                                           [0.3, 0.4, 0.3],  
                                           [0.2, 0.4, 0.4]])

        emission_probability = np.array([[0.2, 0.2, 0.1, 0.15, 0.15, 0.1, 0.05, 0.025, 0.025],
                                         [0.1, 0.15, 0.2, 0.2, 0.15, 0.1, 0.05, 0.025, 0.025],
                                         [0.05, 0.05, 0.1, 0.15, 0.2, 0.2, 0.15, 0.05, 0.05]])

        observed_pairs = np.array(observations_sequence)

        predicted_levels = viterbi(observed_pairs, states, start_probability, transition_probability, emission_probability)

        predicted_levels_list = [int(val) if not math.isnan(val) else 0 for val in predicted_levels]

        print(json.dumps(predicted_levels_list))

    except (json.JSONDecodeError, KeyError, IndexError) as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)
