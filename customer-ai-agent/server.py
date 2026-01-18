from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio
from agent_logic import run_simulation
import uvicorn

app = FastAPI(title="Customer AI Agent Service")

class SimulationRequest(BaseModel):
    persona_override: str = None

@app.post("/simulate")
async def trigger_simulation(request: SimulationRequest):
    """
    Triggers the AI agent to simulate a user session.
    Returns the user's feedback.
    """
    try:
        # Run the agent logic
        result = await run_simulation(persona_override=request.persona_override)
        
        if result.get("status") == "error":
            raise HTTPException(status_code=500, detail=result.get("message"))
             
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
