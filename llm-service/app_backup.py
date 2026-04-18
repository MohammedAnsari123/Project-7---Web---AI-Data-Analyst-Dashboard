from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import json

app = FastAPI()

class InterpretRequest(BaseModel):
    queryText: str
    columns: List[str]

class InsightRequest(BaseModel):
    dataSnapshot: List[dict]
    queryContext: str

class SuggestionRequest(BaseModel):
    columns: List[str]

@app.post("/llm/interpret")
async def interpret_query(req: InterpretRequest):
    # In a real scenario, we would call an LLM (Ollama, OpenAI, local model, etc.) here.
    # For now, we simulate the interpretation logic for common queries.
    
    query = req.query_text.lower()
    cols = req.columns
    
    # Mock logic: If query mentions 'total' or 'sum', use sum operation.
    # If it mentions 'average', use avg.
    # If it mentions 'top', use top.
    
    response = {
        "operation": "count",
        "column": cols[0] if cols else "",
        "metric": "count",
        "groupBy": None,
        "limit": 10
    }
    
    if "total" in query or "sum" in query:
        response["operation"] = "sum"
    elif "average" in query or "avg" in query:
        response["operation"] = "avg"
    elif "top" in query:
        response["operation"] = "top"

    # Try to find a column name in the query
    for col in cols:
        if col.lower() in query:
            response["column"] = col
            break
            
    # Try to find a grouping column (e.g., 'by category')
    if "by" in query:
        parts = query.split("by")
        if len(parts) > 1:
            potential_group = parts[1].strip()
            for col in cols:
                if col.lower() in potential_group:
                    response["groupBy"] = col
                    break

    return response

@app.post("/llm/generate-insight")
async def generate_insight(req: InsightRequest):
    # Simulated insight generation
    return {"insight": "The data shows a significant trend in the selected categories, indicating a potential growth area."}

@app.post("/llm/suggest-queries")
async def suggest_queries(req: SuggestionRequest):
    cols = req.columns
    suggestions = [
        f"Show me the total {cols[0]} by {cols[1]}" if len(cols) > 1 else f"Top 10 {cols[0]}",
        f"What is the average {cols[0]}?" if cols else "Overview of dataset",
        f"Distribution of {cols[1]}" if len(cols) > 1 else "Summary statistics"
    ]
    return {"suggestions": suggestions}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
