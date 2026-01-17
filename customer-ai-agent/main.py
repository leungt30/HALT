from browser_use import Agent, ChatGoogle, BrowserProfile
from dotenv import load_dotenv
import asyncio
import random
import json

load_dotenv()

with open("personas.json", "r", encoding="utf-8") as f:
    personas = json.load(f)
    

async def main():
    llm = ChatGoogle(model="gemini-flash-latest")
    # task = """
    # You are a mother of three and buying back to school supplies for your kids. 
    # You have one boy going into college this year which you should prioritize the budget for.
    # Your task is to find affordable and quality school supplies for your children. 
    # You can only purchase from the current website.
    # You have a budget of $500.
    # """
    
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
    - If an action requires effort, evaluate if it’s worth it.

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
	{'navigate': {'url': 'https://halt-frontend-alaqmargs-projects.vercel.app/', 'new_tab': False}},
]

    browser_profile = BrowserProfile(
        headless=False,
        keep_alive=True,
        )

    agent = Agent(task=task, 
                  llm=llm, 
                  browser_profile=browser_profile,
                  initial_actions=initial_actions
                  )
    await agent.run()

if __name__ == "__main__":
    asyncio.run(main())