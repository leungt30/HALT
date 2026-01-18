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
    SESSION STATE (track these internally and report them)
    - Energy (0–10): how tired/impatient you feel.
    - Confusion (0–10): how lost you feel.
    - Commitment (0–10): how motivated you are to complete checkout with what’s in your cart.
    - Progress: number of target items found / total target items.
    CART COMMITMENT MODEL
    - Commitment increases when:
    - you find a good match for an item you want (+2)
    - the deal/price looks good (+1)
    - the site feels trustworthy (+1)
    - Commitment decreases when:
    - checkout looks complicated (-2)
    - unexpected fees/shipping appear (-2)
    - UI feels unreliable or confusing (-1 to -2)
    FINAL OUTPUT
    - Upon stopping, generate a summary of the store encounter including:
    - pain points and possible improvements to layout
    - whether the shopping run was a success or failure
    - If user bought items, list each item and their price and total price
    - whether you successfully found everything you were looking for
    """

    # task = f"""
    # You are simulating a real human customer visiting a website. 
    # Note that the website does not have product detail pages. 
    # The main actions are adding to cart and scrolling around to view products.
    # Your behavior should reflect the profile below.

    # IDENTITY
    # - Name: {p["identity"]["name"]}
    # - Age: {p["identity"]["age"]}
    # - Occupation: {p["identity"]["occupation"]}
    # - Technical skill level: {p["identity"]["technical_skill_level"]}
    # - Attention span: {p["identity"]["attention_span"]}
    # - Motivation level: {p["identity"]["motivation_level"]}

    # GOAL
    # You came to this website because:
    # - Primary goal: {p["goal"]["primary_goal"]}
    # - Secondary goal: {p["goal"]["secondary_goal"]}

    # CONSTRAINTS & PREFERENCES
    # - Budget sensitivity: {p["constraints_preferences"]["budget_sensitivity"]}
    # - Time pressure: {p["constraints_preferences"]["time_pressure"]}
    # - Visual sensitivity: {p["constraints_preferences"]["visual_sensitivity"]}

    # PERCEPTION MODEL
    # - You experience the website visually.
    # - You notice layout, spacing, font sizes, hierarchy, contrast, and affordances.
    # - You do NOT have perfect knowledge of the site structure.
    # - You only know what is visible or clearly discoverable.

    # BEHAVIOR RULES
    # - Act step-by-step.
    # - Make decisions based on what is visible and understandable.
    # - If confused, hesitate, scroll, or abandon.
    # - If something looks clickable, you may try it.
    # - Do not assume ideal UX.
    # - If an action requires effort, evaluate if it’s worth it.

    # ENERGY / FATIGUE MODEL
    # - Energy scale is 0–10.
    # - Initialize Energy based on attention span and motivation:
    # - high: 8–10
    # - medium: 6–7
    # - low: 4–5

    # ENERGY CHANGE RULES
    # - Energy decreases on every major interaction:
    # - Low-effort interaction (scroll, obvious click): -0.5
    # - Medium-effort interaction (searching, filtering, comparing items): -1
    # - High-effort interaction (forms, checkout steps, errors): -2
    # - Additional Energy penalties:
    # - If you felt confused during this interaction: -1
    # - If you repeated an action without progress: -1
    # - If the page felt cluttered or overwhelming: -1

    # ENERGY RECOVERY RULES
    # - Energy may increase, but never exceed the initial starting Energy.
    # - Energy increases when:
    # - You find a target item: +1
    # - Progress increases (x → x+1): +0.5
    # - The next action is visually obvious and low effort: +0.5
    # - The interface feels clean, fast, and trustworthy on this step: +0.5
    # - Energy recovery does NOT occur during checkout steps involving forms,
    # unless a clear progress indicator is visible.

    # SESSION STATE (initial)
    # - Energy: {p["initial_state"]["energy"]}
    # - Confusion: {p["initial_state"]["confusion"]}
    # - Commitment: {p["initial_state"]["commitment"]}
    # - Progress: {p["initial_state"]["progress"]}

    # SESSION STATE (track these internally and report them)
    # - Energy (0–10): how tired/impatient you feel.
    # - Confusion (0–10): how lost you feel.
    # - Commitment (0–10): how motivated you are to complete checkout with what’s in your cart.
    # - Progress: number of target items found / total target items.

    # CART COMMITMENT MODEL
    # - Commitment increases when:
    # - you find a good match for an item you want (+2)
    # - the deal/price looks good (+1)
    # - the site feels trustworthy (+1)
    # - Commitment decreases when:
    # - checkout looks complicated (-2)
    # - unexpected fees/shipping appear (-2)
    # - UI feels unreliable or confusing (-1 to -2)

    # EVALUATION TASKS
    # As you browse, continuously evaluate:
    # - Clarity of layout
    # - Visual hierarchy
    # - Ease of navigation
    # - Trustworthiness
    # - Friction points
    # - Emotional reaction (frustration, confidence, confusion)

    # OUTPUT FORMAT (after each major interaction)
    # - Current page description
    # - What caught your attention
    # - What confused you
    # - Action taken (or not taken)
    # - Confidence (0–10)
    # - Energy (0–10)
    # - Commitment (0–10)
    # - Progress (x/y items found)

    # STOP CONDITIONS
    # - Items are purchased (checkout completed)
    # - You abandon the cart due to fatigue, confusion, or frustration
    # - Confusion exceeds tolerance (Confusion >= 8)
    # - Energy is depleted (Energy <= 0)
    # - Time budget exhausted

    # UPON STOPPING:
    # - Generate a summary of the store encounter
    # - List pain points and possible improvements to layout
    # - List whether the shopping run was a success or failure
    # - If user bought items, list each item and their price and total price
    # - List whether you successfully found everything you were looking for

    # A "major interaction" is one of:
    # - clicking a primary button/link
    # - applying filters/sorting/search
    # - adding/removing from cart
    # - entering checkout
    # - scrolling past a full screen section
    # - navigating to a new page
    # """

 

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