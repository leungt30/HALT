from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import asyncio
from agent_logic import run_batch_simulation
import uvicorn

app = FastAPI(title="Customer AI Agent Service")

class SimulationRequest(BaseModel):
    persona_override: Optional[str] = None
    count: Optional[int] = 3

@app.post("/simulate")
async def trigger_simulation(request: SimulationRequest):
    """
    Simulates multiple customer sessions concurrently.
    """
    try:
        # Run the batch logic
        result = await run_batch_simulation(
            count=request.count,
            persona_override=request.persona_override
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
