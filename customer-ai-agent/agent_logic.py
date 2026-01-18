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

        # Convert Pydantic model to dict if applicable
        if hasattr(result, 'model_dump'):
            result = result.model_dump()
        elif hasattr(result, 'dict'):
            result = result.dict()

        if result and isinstance(result, dict) and 'user_satisfaction' in result:
             # Ensure types are correct for the feedback server
             result['user_satisfaction'] = str(result['user_satisfaction'])
             return {
                "status": "completed",
                "persona": persona_name,
                "feedback": result
            }
        
        # If result is missing or malformed, return what we have (or empty) but let the server handle it
        # or just return as completed with whatever result is (even if None) to avoid "Session abandoned" injection
        return {
            "status": "completed",
            "persona": persona_name,
            "feedback": result if result else {}
        }
    except Exception as e:
        # Even on exception, return feedback indicating failure
        return {
            "status": "error", 
            "persona": persona_override if isinstance(persona_override, str) else "Unknown",
            "feedback": {
                "user_satisfaction": "0",
                "primary_friction_point": f"Simulation error: {str(e)}",
                "liked_features": [],
                "reason_for_exit": "Technical error during simulation"
            },
            "message": str(e)
        }

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
