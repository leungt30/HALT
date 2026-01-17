import requests
import os
from google import genai

# testing code locally
# import dotenv
# dotenv.load_dotenv() 

MODEL_API_KEY = os.environ.get("API_KEY")
API_URL = "https://halt-backend.vercel.app/"

store_manager_agent = genai.Client()

# Function to prompt the AI model using Gemini API
def get_ai_instructions(prompt):
    try:
        response = store_manager_agent.models.generate_content(
        model="gemini-3-flash-preview", contents=prompt
        )
        return response.text
    except requests.exceptions.RequestException as e:
        print("Error communicating with Gemini API:", str(e))
        return None
    

def test_prompt():
    prompt = "what do you about uoft hacks?"
    ai_response = get_ai_instructions(prompt)
    if ai_response:
        print("AI Response:\n", ai_response)
    else:
        print("Failed to get a response from the AI.")

if __name__ == "__main__":
    test_prompt()