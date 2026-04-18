from pydantic import BaseModel
from typing import List, Optional

class InterpretRequest(BaseModel):
    queryText: str
    columns: List[str]

class InsightRequest(BaseModel):
    dataSnapshot: List[dict]
    queryContext: str

class SuggestionRequest(BaseModel):
    columns: List[str]
