from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from hip_agent import HIPAgent, PromptBuilder


class HipRequest(BaseModel):
    chain_of_thought: str
    question: str
    answers: str


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/base-data")
def base_data():
    chain_of_thought = PromptBuilder().chain_of_thought

    return {
        "chain_of_thought": chain_of_thought,
        "demo_data": {
            "question": "The chain termination method of sequencing:",
            "answers": [
                "uses labeled ddNTPs",
                "uses only dideoxy",
                "nucleotides uses only",
                "deoxynucleotides uses labeled dNTPs",
            ],
            "correct_answer": "uses labeled ddNTPs",
        },
    }


@app.post("/analyze")
async def hip_request(body: HipRequest):
    question = body.question or None
    answers = body.answers.split(",")

    score = HIPAgent().get_response(question, answers, body.chain_of_thought)

    return {"score": score}
