from fastapi import APIRouter
from models.schemas import InterpretRequest, InsightRequest, SuggestionRequest
from controllers.llm_controller import llm_controller

router = APIRouter(prefix="/llm", tags=["LLM Operations"])

@router.post("/interpret")
async def interpret_query(req: InterpretRequest):
    return await llm_controller.interpret(req)

@router.post("/generate-insight")
async def generate_insight(req: InsightRequest):
    return await llm_controller.generate_insight(req)

@router.post("/suggest-queries")
async def suggest_queries(req: SuggestionRequest):
    return await llm_controller.suggest(req.columns)
