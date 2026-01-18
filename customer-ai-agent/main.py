from browser_use import Agent, ChatGoogle, BrowserProfile
from dotenv import load_dotenv
import asyncio
import random
import json
import os

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
# Assumes .env is in the same directory (based on recent fix)
# But let's support both for safety or just stick to the local one
env_path = os.path.join(script_dir, ".env")
load_dotenv(env_path)

personas_path = os.path.join(script_dir, "personas.json")

with open(personas_path, "r", encoding="utf-8") as f:
    personas = json.load(f)

async def run_customer_simulation(persona_override=None, headless=False):
    """
    Core simulation logic.
    Args:
        persona_override: Optional name or object to force a specific persona.
        headless: Boolean to run browser in headless mode.
    Returns:
        Agent history object.
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("Error: GOOGLE_API_KEY not found.")
        return None

    llm = ChatGoogle(model="gemini-flash-latest", api_key=api_key)
    
    # Persona Selection
    if persona_override:
        # Simple string match for name, or random if not found/specified
        # For this POC, we'll just pick random if override isn't a dict
        if isinstance(persona_override, dict):
            p = persona_override
        else:
             # Try to find by name
             p = next((x for x in personas if x["identity"]["name"] == persona_override), None)
             if not p:
                 p = personas[random.randint(0, len(personas) - 1)]
    else:
        index = random.randint(0, len(personas) - 1)
        p = personas[index]

    task = f"""
    You are simulating a real human customer visiting a website. 
    Note that the website does not have product detail pages. 
    The main actions are adding to cart and scrolling around to view products.
    Any feedback you give at the end should be based on the layout of the site and your experience finding products.
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
    - Act efficiently and decisively.
    - Do not wait unless the page is clearly broken.
    - Make decisions based on what is visible.
    - If confused, scroll or click something; do not hesitate.
    - Assume the UX is functional.

    ENERGY / FATIGUE MODEL
    - Energy scale is 0–10.
    - Initialize Energy based on attention span and motivation:
    - high: 8–10
    - medium: 6–7
    - low: 4–5
    ENERGY CHANGE RULES
    - Energy decreases on every major interaction:
    - Low-effort interaction (scroll, obvious click): -0.5
    - Medium-effort interaction (searching, filtering, comparing items): -1
    - High-effort interaction (forms, checkout steps, errors): -2
    SESSION STATE (initial)
    - Energy: {p["initial_state"]["energy"]}
    - Confusion: {p["initial_state"]["confusion"]}
    - Commitment: {p["initial_state"]["commitment"]}
    - Progress: {p["initial_state"]["progress"]}

    IMPORTANT FINAL STEP:
    Once you have completed your goal or run out of energy, you MUST return a strict JSON summary of your experience.
    The format should be:
    {{
        "user_satisfaction": "1-10",
        "primary_friction_point": "string",
        "liked_features": ["string"],
        "reason_for_exit": "string"
    }}
    """

    initial_actions = [
        {'navigate': {'url': 'https://halt-frontend-alaqmargs-projects.vercel.app/', 'new_tab': False}},
    ]

    browser_profile = BrowserProfile(
        headless=headless,
        keep_alive=not headless, # Keep alive if visible, close if headless (usually)
    )

    agent = Agent(task=task, 
                  llm=llm, 
                  browser_profile=browser_profile,
                  initial_actions=initial_actions,
                  max_steps=25
                  )
    
    history = await agent.run()
    return history, p["identity"]["name"] # Return history and persona name

async def main():
    # CLI entry point
    await run_customer_simulation(headless=False)

if __name__ == "__main__":
    asyncio.run(main())