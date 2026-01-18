"""
Agent Click Monitor - Listens to backend API for agent clicks
Displays all tracked interactions in real-time
"""

import asyncio
import requests
import json
from datetime import datetime
import time

BACKEND_URL = "http://localhost:3000"

# Store for all clicks
all_clicks = []

async def monitor_clicks():
    """Monitor clicks from the backend tracking API"""
    print("\n" + "="*70)
    print("AGENT CLICK TRACKER - Real-time Monitoring")
    print("="*70)
    print("Listening for clicks from customer agent...\n")
    
    last_count = 0
    
    while True:
        try:
            # Note: We'll track via console output from backend
            # For now, just wait and let the agent run
            await asyncio.sleep(1)
        except KeyboardInterrupt:
            print("\n\nStopping monitor...")
            break
        except Exception as e:
            print(f"Error: {e}")
            await asyncio.sleep(1)

def print_tracked_click(click_data):
    """Format and print a tracked click"""
    print(f"[TRACKED] {click_data.get('action', 'unknown')} {{")
    print(f"  itemId: \"{click_data.get('itemId', 'N/A')}\",")
    print(f"  itemName: \"{click_data.get('itemName', 'N/A')}\",")
    print(f"  itemPrice: {click_data.get('itemPrice', 'N/A')},")
    print(f"  timestamp: \"{click_data.get('timestamp', '')}\"")
    print("}")
    print()

async def run_agent_with_tracking():
    """Run the customer agent and display tracking output"""
    from browser_use import Agent, ChatGoogle, BrowserProfile
    from dotenv import load_dotenv
    import random
    
    load_dotenv()
    
    with open("personas.json", "r", encoding="utf-8") as f:
        personas = json.load(f)
    
    index = random.randint(0, len(personas) - 1)
    p = personas[index]
    
    print(f"\n🤖 Agent Persona: {p['identity']['name']}")
    print(f"   Goal: {p['goal']['primary_goal']}")
    print(f"   Budget Sensitivity: {p['constraints_preferences']['budget_sensitivity']}\n")
    
    task = f"""
    You are simulating a real human customer visiting a website. 
    Note that the website does not have product detail pages. 
    The main actions are adding to cart and scrolling around to view products.
    Your behavior should reflect the profile below.

    IDENTITY
    - Name: {p["identity"]["name"]}
    - Age: {p["identity"]["age"]}
    - Occupation: {p["identity"]["occupation"]}
    - Technical skill level: {p["identity"]["technical_skill_level"]}
    - Attention span: {p["identity"]["attention_span"]}
    - Motivation level: {p["identity"]["motivation_level"]}

    GOAL
    You came to this website because:
    - Primary goal: {p["goal"]["primary_goal"]}
    - Secondary goal: {p["goal"]["secondary_goal"]}

    CONSTRAINTS & PREFERENCES
    - Budget sensitivity: {p["constraints_preferences"]["budget_sensitivity"]}
    - Time pressure: {p["constraints_preferences"]["time_pressure"]}
    - Visual sensitivity: {p["constraints_preferences"]["visual_sensitivity"]}

    PERCEPTION MODEL
    - You experience the website visually.
    - You notice layout, spacing, font sizes, hierarchy, contrast, and affordances.
    - You do NOT have perfect knowledge of the site structure.
    - You only know what is visible or clearly discoverable.

    BEHAVIOR RULES
    - Act step-by-step.
    - Make decisions based on what is visible and understandable.
    - If confused, hesitate, scroll, or abandon.
    - If something looks clickable, you may try it.
    - Do not assume ideal UX.
    - If an action requires effort, evaluate if it's worth it.

    ENERGY / FATIGUE MODEL
    - Energy scale is 0–10.
    - Initialize Energy based on attention span and motivation:
    - high: 8–10
    - medium: 6–7
    - low: 4–5

    SESSION STATE (initial)
    - Energy: {p["initial_state"]["energy"]}
    - Confusion: {p["initial_state"]["confusion"]}
    - Commitment: {p["initial_state"]["commitment"]}
    - Progress: {p["initial_state"]["progress"]}
    """

    initial_actions = [
        {'navigate': {'url': 'http://localhost:5173/', 'new_tab': False}},
    ]

    browser_profile = BrowserProfile(
        headless=False,
        keep_alive=True,
    )

    llm = ChatGoogle(model="gemini-flash-latest")

    agent = Agent(
        task=task,
        llm=llm,
        browser_profile=browser_profile,
        initial_actions=initial_actions
    )
    
    print("⏳ Agent is browsing the site...\n")
    print("="*70)
    print("TRACKING ALL CLICKS IN REAL-TIME")
    print("="*70 + "\n")
    
    await agent.run()
    
    print("\n" + "="*70)
    print("AGENT SESSION COMPLETED")
    print("="*70)
    print("All clicks have been logged to the backend terminal")
    print("Check the backend console for detailed tracking output\n")

if __name__ == "__main__":
    asyncio.run(run_agent_with_tracking())
