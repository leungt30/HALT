import requests
import os
from google import genai
from logger.logger import logger
from store_connector.store_connector import StoreConnector
from utilities import *
import json
import time

# testing code locally
import dotenv
dotenv.load_dotenv()

MODEL_API_KEY = os.environ.get("API_KEY")
API_URL = "https://api.halt-hack.tech/"
LOCAL_API_URL = "https://api.halt-hack.tech/"

# Function to prompt the AI model using Gemini API
def get_ai_instructions(ai_client, prompt):
    try:
        response = ai_client.models.generate_content(
        model="gemini-3-flash-preview", contents=prompt
        )
        return json.loads(response.text)  # Convert the response to JSON
    except json.JSONDecodeError as e:
        logger.error("Failed to decode AI response as JSON: %s", str(e))
        return None
    except requests.exceptions.RequestException as e:
        logger.error("Error communicating with Gemini API: %s", str(e))
        return None

# Function to retry AI layout generation
def retry_get_ai_instructions(ai_client, prompt, retries=3):
    for attempt in range(retries):
        try:
            response = ai_client.models.generate_content(
                model="gemini-3-flash-preview", contents=prompt
            )
            # Handle potential markdown code blocks in response
            text = response.text
            if text.startswith("```json"):
                text = text[7:]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()
            
            return json.loads(text)  # Convert the response to JSON
        except json.JSONDecodeError as e:
            logger.error("Attempt %d: Failed to decode AI response as JSON: %s. Response: %s", attempt + 1, str(e), response.text[:100])
        except Exception as e:
            logger.error("Attempt %d: Error communicating with Gemini API: %s", attempt + 1, str(e))

        logger.info("Retrying layout generation (Attempt %d/%d)...", attempt + 1, retries)

    logger.error("All attempts to generate a valid layout have failed.")
    return None

# Function to trigger customer simulations
def run_customer_simulation_batch(count=3):
    try:
        # Assuming customer-ai-agent is running on port 8000
        response = requests.post(
            "http://localhost:8000/simulate",
            json={"count": count},
            headers={"Content-Type": "application/json"},
            timeout=600 # Wait up to 10 mins for batch to complete (browsers can be slow)
        )
        if response.status_code == 200:
            return response.json()
        else:
            logger.error(f"Simulation failed: {response.text}")
            return None
    except Exception as e:
        logger.error(f"Error triggering simulation: {e}")
        return None

def analyze_results(sim_results):
    if not sim_results or "results" not in sim_results:
        return 0, "No results"
    
    total_score = 0
    feedback_lines = []
    count = 0
    
    for res in sim_results["results"]:
        try:
            # Feedback needs careful parsing if it's a string
            fb_raw = res.get("feedback")
            # If the agent returned a stringified JSON, parse it
            if isinstance(fb_raw, str):
                try:
                    fb = json.loads(fb_raw)
                except:
                    # Fallback if it's just a text blob (which shouldn't happen with our strict prompt)
                    fb = {"user_satisfaction": 0} 
            else:
                fb = fb_raw
            
            # Clean up score (might be "8" or "8/10")
            score_str = str(fb.get("user_satisfaction", "0")).split("/")[0].strip()
            try:
                score = float(score_str)
            except:
                score = 0
                
            total_score += score
            count += 1
            
            persona = res.get("persona")
            friction = fb.get("primary_friction_point", "N/A")
            liked = fb.get("liked_features", "N/A")
            exit_reason = fb.get("reason_for_exit", "N/A")
            
            feedback_lines.append(f"- Customer ({persona}): Score {score}/10. Friction: {friction}. Liked: {liked}. Exit: {exit_reason}")
            
        except Exception as e:
            logger.error(f"Error parsing feedback for one result: {e}")
            continue

    avg_score = total_score / count if count > 0 else 0
    return avg_score, "\n".join(feedback_lines)

def main():
    # Initialize the AI client and store connector
    api_key = os.environ.get("GOOGLE_API_KEY") or os.environ.get("API_KEY")
    store_manager_agent = genai.Client(api_key=api_key)
    store_connector = StoreConnector(API_URL)

    # Main Optimization Loop
    iteration = 0
    max_iterations = 5 # Safety break
    
    logger.info("🚀 Starting Store Optimization Loop")

    while iteration < max_iterations:
        iteration += 1
        logger.info(f"--- Iteration {iteration} of {max_iterations} ---")
        
        # 0. Fetch Current Layout
        current_layout = store_connector.fetch_current_layout()
        if not current_layout: 
            logger.error("Could not fetch layout. Retrying in 5s...")
            time.sleep(5)
            continue

        # 1. Set Flag
        flag_name = f"Iteration {iteration}"
        logger.info(f"🚩 Setting Flag: {flag_name}")
        store_connector.set_flag(flag_name)
        
        # 2. Run Simulation (Wait for feedback)
        logger.info("👥 Sending 3 customers to browse store...")
        sim_results = run_customer_simulation_batch(count=3)
        
        if not sim_results:
            logger.error("Simulation failed. Aborting loop.")
            break
        
        # 3. Fetch customer actions
        customer_actions = store_connector.get_customer_actions(flag_value=flag_name)
        logger.info(f"Retrieved customer actions: {json.dumps(customer_actions, indent=2)}")
        
        # 4. Analyze Feedback
        avg_score, feedback_summary = analyze_results(sim_results)
        logger.info(f"📊 Iteration {iteration} Results: Avg Score = {avg_score:.2f}/10")
        logger.info(f"📝 Customer Feedback Summary:\n{feedback_summary}")
        
        # 5. Success Check
        if avg_score > 8.0:
            logger.info("✅ Target Score (> 8.0) Reached! Stopping optimization.")
            logger.info("🎉 Opening the FINAL OPTIMIZED LAYOUT in your browser...")
            import webbrowser
            webbrowser.open("https://halt-hack.tech/")
            break
        
        logger.info("❌ Score too low. Generating improvements...")
        
        # 6. Optimize Layout
        prompt = get_optimization_prompt(current_layout, feedback_summary, avg_score, customer_actions)
        new_layout = retry_get_ai_instructions(store_manager_agent, prompt)
        
        if not new_layout:
            logger.error("Failed to generate new layout.")
            continue
            
        # 6. Update Layout
        logger.info("💾 Updating Store Layout...")
        update_result = store_connector.update_layout(new_layout)
        if update_result:
            logger.info("Layout updated successfully.")
        else:
            logger.error("Layout update failed.")
        
        logger.info("Waiting 5 seconds before next iteration...")
        time.sleep(5)

if __name__ == "__main__":
    main()