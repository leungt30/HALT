from main import run_customer_simulation
import asyncio

async def run_simulation(persona_override=None):
    """
    Wrapper for the main simulation logic.
    """
    try:
        # We can pass specific args if needed for the service (e.g. headless=False for demo)
        history, persona_name = await run_customer_simulation(
            persona_override=persona_override, 
            headless=False 
        )
        
        # Extract the final result
        result = history.final_result() 

        return {
            "status": "completed",
            "persona": persona_name,
            "feedback": result
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    print(asyncio.run(run_simulation()))
