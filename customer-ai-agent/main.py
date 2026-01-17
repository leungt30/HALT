from browser_use import Agent, ChatGoogle, BrowserProfile
from dotenv import load_dotenv
import asyncio

load_dotenv()

async def main():
    llm = ChatGoogle(model="gemini-flash-latest")
    task = """
    You are a mother of three and buying back to school supplies for your kids. 
    You have one boy going into college this year which you should prioritize the budget for.
    Your task is to find affordable and quality school supplies for your children. 
    You can only purchase from the current website.
    You have a budget of $500.
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