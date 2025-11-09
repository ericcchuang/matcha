import json
from mangum import Mangum

#from dotenv import load_dotenv
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

#load_dotenv()

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

@app.get("/api/generateProblems")
async def generateProblems():
  try:
    json_string = await getProblems(prompts["arithmetic"]) 
  except Exception as e:
    # Return a structured error instead of letting the exception produce a 500
    print(f"Error generating problems: {e}")
    return {"error": "Failed to generate problems from LLM", "details": str(e)}

  try:
    problems = json.loads(json_string)
    return problems
  except json.JSONDecodeError as e:
    print(f"Error parsing LLM output: {e}")
    # Return the raw output to help debugging in logs and a parse error message
    return {"error": "Failed to parse JSON from LLM", "raw_output": json_string}

async def getProblems(input):
  # Import dedalus lazily so the module can be imported even if the package
  # isn't installed in the environment. This prevents import-time failures
  # which cause Vercel to return 500 immediately.
  try:
    from dedalus_labs import AsyncDedalus, DedalusRunner
  except Exception as e:
    # If the package is missing or fails to import, raise a controlled
    # exception so callers can return a helpful error message.
    raise RuntimeError(f"dedalus_labs is not available: {e}")

  client = AsyncDedalus()
  runner = DedalusRunner(client)
  response = await runner.run(
    input=input,
    model="gemini-2.5-flash-lite",
  )
  return response.final_output

@app.get("/api/cards")
async def cards():
    '''with open('./cards.json', 'r') as f:
        return json.load(f)'''
    return(card_info)
    
handler = Mangum(app)
