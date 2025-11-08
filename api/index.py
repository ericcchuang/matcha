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