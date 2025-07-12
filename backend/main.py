# backend/main.py
from fastapi import FastAPI
from routes import gemini  # import your Gemini route

app = FastAPI()
app.include_router(gemini.router)
