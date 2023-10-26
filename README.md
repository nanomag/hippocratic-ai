# Hippocratic AI Coding Assignment

Welcome to the [Hippocratic AI](https://www.hippocraticai.com) coding assignment

---

## Getting started

### Create enviroment variables

1. In the root folder, create a `.env` file
2. Add `OPENAI_API_KEY=` (use `.env.example` as reference)

### Install python packages

1. In the root folder, create a virtual environment: `python3 -m venv venv`
2. Activate the virtual env: `source venv/bin/activate`
3. Install the python packages: `pip install -r requirements.txt`

### Run the core (CLI)

1. In the root folder, execute `python3 testbench.py`

### Run the server (API)

1. In the root folder, execute `uvicorn server:app --reload`
2. Open [http://127.0.0.1:8000](http://127.0.0.1:8000) to see the API

### Run the app (UI)

Keep the server running in another tab, it's needed for the app in order to work properly.

1. Use the terminal and go to: `cd app/`
2. Make a copy of `.env.example` and rename the copy to `.env` (the defined env vars work locally)
3. Install the npm libraries: `npm install`
4. Run the NextJS server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) to see the Web App

![](images/app.png?raw=true)

## New things included

1. Updated the prompting to improve the scoring. **Original:** `2/20`. **New:** `15/20`.
2. Updated the core logic of `hip_agent.py`. Distributed the tasks/responsibilities in specific classes
3. Created a server with FastAPI
4. Created a web app with NextJS. The app uses server components and client components

---

## Instructions

The attached code is a simple multiple-choice question taker. We have included sample questions. Your goal is to make this code "better"

- Do not modify testbench.py
- You may do anything you like inside hip_agent.py (or add more files) as long as the interface to testbench.py remains the same
- You must use GPT 3.5 as the LLM (not gpt 4, palm 2, fine-tuned BERT, etc)
- We included an openai api key. Please don't abuse it.

---

## Rules

- This assignment is open-ended. Part of the test is seeing what you decide is important.
- You may use any resources you like with the following restrictions
  - They must be resources that would be available to you if you worked here (so no other humans, no closed AIs, no unlicensed code, etc.)
  - Allowed resources include but not limited to Stack overflow, random blogs, Chatgpt et al.
  - You must cite the sources
  - If you use an AI coding tool, in addition to citing the AI generated lines of code, also please include a transcript of the prompts and completions from chat gpt that you used
- The recommended time to spend on this assignment is 4 hours, but there are no restrictions.
- DO NOT PUSH THE API KEY TO GITHUB. OpenAI will automatically delete it.
- You may ask questions.

---

## What does "Better" mean

_You_ decide what better means, but here are some ideas to help get the brain-juices flowing!

- Improve the score using various well-studied methods
  - Shots
  - Chain of thought
  - Introduce documents and retrieval augmented generation (we included one open source book, but you are welcome to add whatever you like)
  - AutoGPT
- Improve the quality of the code
- Add a front end interface
- Add testbenches

---

## How will I be evaluated

Good question. We want to know the following

- Can you code
- Can you understand and deconstruct a problem
- Can you operate in an open-ended environment
- Can you be creative
- Do you understand what it means to deliver value versus check a box
- Can you _really_ code
- Can you surprise us
