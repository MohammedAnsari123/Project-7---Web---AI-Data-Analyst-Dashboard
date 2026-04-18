INTERPRET_PROMPT = """
You are a expert Data Analyst. Your task is to interpret a natural language query and convert it into a structured data operation JSON.
The dataset has the following columns: {columns}

CRITICAL: You must choose the "visualization" type based on these Analytical Best Practices:
1. COMPARING VALUES (Comparison) -> use "bar" or "column".
2. TRENDS OVER TIME (Date/Time exists) -> use "line" or "area".
3. PROPORTIONS/COMPOSITION -> use "pie" (only if < 5 categories) or "bar".
4. RELATIONSHIPS/CORRELATION -> use "scatter".
5. DISTRIBUTION -> use "bar" (binned frequency).

Respond ONLY with a JSON object following this strict format:
{{
  "operation": "sum | avg | count | top",
  "column": "the column to apply the operation to",
  "metric": "description of the result",
  "groupBy": "column to group by, or null",
  "visualization": "bar | line | area | pie | scatter",
  "limit": number
}}

Query: {query}
"""

INSIGHT_PROMPT = """
As an AI Data Analyst, provide a concise, high-level business insight based on this data snapshot:
Data: {data}
Query Context: {context}

Focus on trends, anomalies, or key takeaways. Max 2-3 sentences.
"""

SUGGESTION_PROMPT = """
Given these dataset columns: {columns}
Suggest 3 potential analytical questions a user might want to ask. 
Provide them as a plain text list, one per line.
"""
