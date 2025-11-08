import asyncio
import json

from dotenv import load_dotenv
from dedalus_labs import AsyncDedalus, DedalusRunner
from dedalus_labs.utils.streaming import stream_async
from fastapi import FastAPI
app = FastAPI()

load_dotenv()

with open("./prompts.json","r") as f:
    prompts = json.load(f)

@app.get("/")
def read_root(input: str):
    return {"response": asyncio.run(main(input))}

@app.get("/generateProblems")
def generateProblems():
    problems = json.loads(asyncio.run(main(prompts["arithmetic"])))
    return problems

async def main(input):
    client = AsyncDedalus()
    runner = DedalusRunner(client)
    response = await runner.run(
        input=input,
        model="claude-sonnet-4-20250514",
    )
    return(response.final_output)




'''if __name__ == "__main__":
    asyncio.run(main())'''