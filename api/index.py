import asyncio

from dotenv import load_dotenv
from dedalus_labs import AsyncDedalus, DedalusRunner
from dedalus_labs.utils.streaming import stream_async
from fastapi import FastAPI
app = FastAPI()

load_dotenv()

@app.get("/")
def read_root(input: str):
    return {"response": asyncio.run(main(input))}

@app.get("/generateProblems")
def read_root():
    return {asyncio.run(main(f"Generate 100 basic arithmatic problems. The format should be in a json format where each problem maps to the correct answer. The questions should only use up to 2 digit numbers. Do not generate any additional text, only generate numbers. Do not use newline characters or any formatting characters. Make each equation its own key value pair."))}

async def main(input):
    client = AsyncDedalus()
    runner = DedalusRunner(client)
    response = await runner.run(
        input=input,
        model="openai/gpt-4.1"
    )
    return(response.final_output)




'''if __name__ == "__main__":
    asyncio.run(main())'''