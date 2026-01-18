"""
Agent Click Tracker - Captures clicks from the customer AI agent
Without modifying the agent code itself
"""

import asyncio
import json
from datetime import datetime
from browser_use import Agent, ChatGoogle, BrowserProfile
from dotenv import load_dotenv
import random

load_dotenv()

# Store for tracking clicks
tracked_clicks = []

async def main():
    llm = ChatGoogle(model="gemini-flash-latest")
    
    with open("personas.json", "r", encoding="utf-8") as f:
        personas = json.load(f)
    
    index = random.randint(0, len(personas) - 1)
    p = personas[index]
    
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

    agent = Agent(
        task=task,
        llm=llm,
        browser_profile=browser_profile,
        initial_actions=initial_actions
    )
    
    await agent.run()
    
    # Print all tracked clicks after agent finishes
    print("\n" + "="*60)
    print("AGENT INTERACTION SUMMARY")
    print("="*60)
    print(f"Total clicks tracked: {len(tracked_clicks)}")
    print("\nClick Details:")
    print("="*60 + "\n")
    
    for i, click in enumerate(tracked_clicks, 1):
        print(f"Click #{i}:")
        print(json.dumps(click, indent=2))
        print()

if __name__ == "__main__":
    asyncio.run(main())
