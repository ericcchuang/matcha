import asyncio
import json
from mangum import Mangum

from dotenv import load_dotenv
from dedalus_labs import AsyncDedalus, DedalusRunner
from dedalus_labs.utils.streaming import stream_async
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

with open("./prompts.json","r") as f:
    prompts = json.load(f)

@app.get("/generateProblems")
async def generateProblems():
    json_string = await getProblems(prompts["arithmetic"]) 
    try:
        problems = json.loads(json_string)
        return problems
    except json.JSONDecodeError as e:
        print(f"Error parsing LLM output: {e}")
        return {"error": "Failed to parse JSON from LLM"}
    pass

async def getProblems(input):
    client = AsyncDedalus()
    runner = DedalusRunner(client)
    response = await runner.run(
        input=input,
        model="gemini-2.5-flash-lite",
    )
    return(response.final_output)

@app.get("/cards")
async def cards():
    with open('./cards.json', 'r') as f:
        return json.load(f)
    
handler = Mangum(app)
