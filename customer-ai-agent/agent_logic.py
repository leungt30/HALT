from main import run_customer_simulation
import asyncio

async def run_single_simulation(persona_override=None, window_index=0, total_windows=1):
    """
    Runs a single simulation and returns formatted result.
    """
    try:
        # We can pass specific args if needed for the service (e.g. headless=False for demo)
        history, persona_name = await run_customer_simulation(
            persona_override=persona_override, 
            headless=False,
            window_index=window_index, 
            total_windows=total_windows
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

async def run_batch_simulation(count=3, persona_override=None):
    """
    Runs multiple simulations concurrently.
    """
    tasks = []
    for i in range(count):
        tasks.append(run_single_simulation(
            persona_override=persona_override,
            window_index=i,
            total_windows=count
        ))
    
    # Run them all concurrently
    results = await asyncio.gather(*tasks)
    
    return {
        "status": "batch_completed",
        "count": count,
        "results": results
    }

if __name__ == "__main__":
    print(asyncio.run(run_simulation()))
