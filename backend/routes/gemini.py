from fastapi import APIRouter, Request
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
API_KEY = os.getenv("GEMINI_API_KEY")

@router.post("/ask-gemini")
async def ask_gemini(request: Request):
    body = await request.json()
    prompt = body.get("prompt", "")

    gen_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"

    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(gen_url, headers=headers, json=payload)
        result = response.json()

    try:
        return {
            "text": result["candidates"][0]["content"]["parts"][0]["text"]
        }
    except Exception as e:
        return {"text": "Sorry, I couldn’t process that."}
