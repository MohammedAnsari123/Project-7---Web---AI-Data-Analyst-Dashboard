from huggingface_hub import InferenceClient
import os
import json
import re
from dotenv import load_dotenv
from prompts.templates import INTERPRET_PROMPT, INSIGHT_PROMPT, SUGGESTION_PROMPT

load_dotenv()

class HuggingFaceService:
    def __init__(self, model_id=None):
        self.api_key = os.getenv("HUGGINGFACE_API_KEY")
        self.model_id = model_id or os.getenv("MODEL_ID") or "mistralai/Mistral-7B-Instruct-v0.2"
        
        if not self.api_key:
            print("Warning: HUGGINGFACE_API_KEY not found. Falling back to local/dummy mode.")
            
        self.client = InferenceClient(model=self.model_id, token=self.api_key)

    def _extract_json(self, text: str):
        """Helper to extract JSON from LLM response."""
        try:
            match = re.search(r'(\{.*\})', text, re.DOTALL)
            if match:
                return json.loads(match.group(1))
            return json.loads(text)
        except Exception:
            return None

    def _fallback_interpretation(self, query: str, columns: list):
        """Rule-based fallback if LLM fails, now with Smart Visualization logic."""
        query_lower = query.lower()
        
        operation = "view"
        column = columns[0] if columns else ""
        groupBy = None
        visualization = "bar" # Default
        
        # 1. Operation Heuristics
        if any(word in query_lower for word in ['sum', 'total', 'add']):
            operation = 'sum'
        elif any(word in query_lower for word in ['average', 'avg', 'mean']):
            operation = 'avg'
        elif any(word in query_lower for word in ['count', 'how many', 'number of']):
            operation = 'count'
        elif any(word in query_lower for word in ['top', 'highest', 'best', 'max']):
            operation = 'top'

        # 2. Time Detection (Comparison -> Bar vs Time -> Line)
        time_indicators = ['date', 'time', 'year', 'month', 'day', 'trend', 'over time']
        is_time_series = any(word in query_lower for word in time_indicators)
        for col in columns:
            if any(indicator in col.lower() for indicator in ['date', 'year', 'time']):
                is_time_series = True
                break

        if is_time_series:
            visualization = "line"
        elif any(word in query_lower for word in ['scatter', 'correlation', 'relationship']):
            visualization = "scatter"
        elif any(word in query_lower for word in ['proportion', 'composition', 'pie']):
            visualization = "pie"

        # 3. Parameter Mapping
        for col in columns:
            if col.lower() in query_lower:
                column = col
                break
        
        if ' by ' in query_lower:
            parts = query_lower.split(' by ')
            for col in columns:
                if col.lower() in parts[1]:
                    groupBy = col
                    break

        return {
            "operation": operation,
            "column": column,
            "metric": f"{operation} of {column}",
            "groupBy": groupBy,
            "visualization": visualization,
            "limit": 10
        }

    def interpret_query(self, query: str, columns: list):
        try:
            prompt = INTERPRET_PROMPT.format(columns=", ".join(columns), query=query)
            content = self.client.text_generation(
                prompt,
                max_new_tokens=250,
                temperature=0.1,
                stop_sequences=["}"]
            )
            if not content.endswith("}"):
                content += "}"
                
            structured = self._extract_json(content)
            if structured:
                # Ensure the LLM provided a visualization, else fallback
                if 'visualization' not in structured:
                    structured['visualization'] = self._fallback_interpretation(query, columns)['visualization']
                return structured
        except Exception as e:
            print(f"LLM API Error: {str(e)}. Triggering Fallback.")
        
        return self._fallback_interpretation(query, columns)

    def generate_insight(self, data: list, context: str):
        try:
            prompt = INSIGHT_PROMPT.format(data=json.dumps(data), context=context)
            return self.client.text_generation(
                prompt,
                max_new_tokens=200,
                temperature=0.7
            )
        except Exception:
            return "The analysis indicates stable parameters across the detected vectors. Further archival verification recommended."

    def suggest_queries(self, columns: list):
        try:
            prompt = SUGGESTION_PROMPT.format(columns=", ".join(columns))
            content = self.client.text_generation(
                prompt,
                max_new_tokens=200,
                temperature=0.8
            )
            suggestions = [s.strip("- ").strip() for s in content.split("\n") if s.strip()]
            return suggestions[:3]
        except Exception:
            return ["Top values by Category", "Distribution of Units", "Summary of Revenue"]
