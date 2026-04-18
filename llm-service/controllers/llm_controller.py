from services.llm_service import HuggingFaceService
from models.schemas import InterpretRequest, InsightRequest
from fastapi import HTTPException

class LLMController:
    def __init__(self):
        self.hf_service = HuggingFaceService()

    async def interpret(self, req: InterpretRequest):
        try:
            return self.hf_service.interpret_query(req.queryText, req.columns)
        except Exception as e:
            print(f"Controller Error: {str(e)}")
            # Even if the service call itself crashes, return a safest fallback
            return self.hf_service._fallback_interpretation(req.queryText, req.columns)

    async def generate_insight(self, req: InsightRequest):
        try:
            insight = self.hf_service.generate_insight(req.dataSnapshot, req.queryContext)
            return {"insight": insight}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def suggest(self, columns: list):
        try:
            suggestions = self.hf_service.suggest_queries(columns)
            return {"suggestions": suggestions}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

# Instance to be shared
llm_controller = LLMController()
