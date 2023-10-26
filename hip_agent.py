import openai
from decouple import config


class HIPAgent:
    def get_response(self, question, answer_choices, chain_of_thought=None):
        """
        Calls the OpenAI 3.5 API to generate a response to the question.
        The response is then matched to one of the answer choices and the index of the
        matching answer choice is returned. If the response does not match any answer choice,
        -1 is returned.

        Args:
            question: The question to be asked.
            answer_choices: A list of answer choices.

        Returns:
            The index of the answer choice that matches the response, or -1 if the response
            does not match any answer choice.
        """

        # Create the prompt.
        prompt = PromptBuilder(chain_of_thought).create_prompt(question, answer_choices)

        # Call the OpenAI 3.5 API.
        openai_client = OpenAIClient()
        response = openai_client.create_chat_completion(prompt)
        response_text = openai_client.get_chat_completion_response_text(response)

        # Match the response to one of the answer choices.
        return MatchingProcessor.get_match_score(answer_choices, response_text)


class OpenAIClient:
    def __init__(self):
        self.openai = openai
        self.openai.api_key = config("OPENAI_API_KEY")

    def create_chat_completion(self, prompt):
        return openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt},
            ],
        )

    def get_chat_completion_response_text(self, response):
        return response.choices[0].message.content


class PromptBuilder:
    def __init__(self, chain_of_thought=None):
        chain_of_thought = """
            You are a biologist expert and we will provide a question with multiple answers.
            Choose only the correct answer and try to select the most specific answer, not the most general answer.
            Only reply with the text of the correct answer.

            An example is:

            "The chain termination method of sequencing:
            
            uses labeled ddNTPs
            uses only dideoxynucleotides
            uses only deoxynucleotides
            uses labeled dNTPs
            
            The correct answer and your response must be:
            uses labeled ddNTPs"

            Now, you will find the real question you must answer. The question and posible answers are below.
        """

        if chain_of_thought:
            self.chain_of_thought = chain_of_thought

    def create_prompt(self, question, answer_choices):
        answer_str = "\n".join(answer_choices)
        return f"{self.chain_of_thought} \n\n {question} \n\n{answer_str}"


class MatchingProcessor:
    def get_match_score(answer_choices, response_text):
        # Match the response to one of the answer choices.
        for i, answer_choice in enumerate(answer_choices):
            if response_text == answer_choice:
                return i

        # If the response does not match any answer choice, return -1.
        return -1
