from fastapi import FastAPI
from routes.llm_routes import router as llm_router
import uvicorn

app = FastAPI(title="AI Data Analyst LLM Service")

# Include Modular Routes
app.include_router(llm_router)

@app.get("/")
async def root():
    return {"status": "LLM Service is live"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
