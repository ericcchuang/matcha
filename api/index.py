import json

from dotenv import load_dotenv
from dedalus_labs import AsyncDedalus, DedalusRunner
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

'''with open("./prompts.json","r") as f:
    prompts = json.load(f)'''
prompts = {
  "arithmetic": "Generate 25 basic arithmetic problems in a json formatted like {\"problem1\": {\"problem\": 1+2, \"answer\": 3}, \"problem2\": {\"problem1\": {\"problem\": 12+23, \"answer\": 35}..etc} The questions should only use up to 2 digit numbers. Use addition, subtraction, multiplacation, and division. The answers can be negative, but they can not be decimals or fractions. Do not generate any additional text, only generate the problems. Do not use newline characters or any formatting characters. Make each equation its own entry."
}
card_info = [
  {
    "id": 0,
    "name": "zero",
    "rarity": "common"
  },
  {
    "id": 1,
    "name": "one",
    "rarity": "common"
  },
  {
    "id": 2,
    "name": "two",
    "rarity": "common"
  },
  {
    "id": 3,
    "name": "three",
    "rarity": "common"
  },
  {
    "id": 4,
    "name": "four",
    "rarity": "common"
  },
  {
    "id": 5,
    "name": "five",
    "rarity": "common"
  },
  {
    "id": 6,
    "name": "six",
    "rarity": "common"
  },
  {
    "id": 7,
    "name": "seven",
    "rarity": "common"
  },
  {
    "id": 8,
    "name": "eight",
    "rarity": "common"
  },
  {
    "id": 9,
    "name": "nine",
    "rarity": "common"
  },
  {
    "id": 10,
    "name": "plus",
    "rarity": "uncommon"
  },
  {
    "id": 11,
    "name": "minus",
    "rarity": "uncommon"
  },
  {
    "id": 12,
    "name": "nine-plus-ten",
    "rarity": "rare"
  },
  {
    "id": 13,
    "name": "six-seven",
    "rarity": "epic"
  }
]

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
    '''with open('./cards.json', 'r') as f:
        return json.load(f)'''
    return(card_info)