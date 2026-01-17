import requests
import os
from google import genai
import logging
from store_connector.store_connector import StoreConnector
from utilities import *
import json

# testing code locally
# import dotenv
# dotenv.load_dotenv()

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

MODEL_API_KEY = os.environ.get("API_KEY")
API_URL = "https://halt-backend.vercel.app/"

# Function to prompt the AI model using Gemini API
def get_ai_instructions(ai_client, prompt):
    try:
        response = ai_client.models.generate_content(
        model="gemini-3-flash-preview", contents=prompt
        )
        return json.loads(response.text)  # Convert the response to JSON
    except json.JSONDecodeError as e:
        logger.error("Failed to decode AI response as JSON: %s", str(e))
        return None
    except requests.exceptions.RequestException as e:
        logger.error("Error communicating with Gemini API: %s", str(e))
        return None

# Function to retry AI layout generation
def retry_get_ai_instructions(ai_client, prompt, retries=3):
    for attempt in range(retries):
        try:
            response = ai_client.models.generate_content(
                model="gemini-3-flash-preview", contents=prompt
            )
            return json.loads(response.text)  # Convert the response to JSON
        except json.JSONDecodeError as e:
            logger.error("Attempt %d: Failed to decode AI response as JSON: %s", attempt + 1, str(e))
        except requests.exceptions.RequestException as e:
            logger.error("Attempt %d: Error communicating with Gemini API: %s", attempt + 1, str(e))

        logger.info("Retrying layout generation (Attempt %d/%d)...", attempt + 1, retries)

    logger.error("All attempts to generate a valid layout have failed.")
    return None

def main():
    # Initialize the AI client and store connector
    store_manager_agent = genai.Client()
    store_connector = StoreConnector(API_URL)

    # Fetch the current layout from the backend
    current_layout = store_connector.fetch_current_layout()
    if not current_layout:
        logger.error("Failed to fetch the current layout.")
        return
    logger.info("Current Layout: %s", current_layout)

    # Generate a prompt with the current layout
    prompt = get_prompt(current_layout)
    new_layout = retry_get_ai_instructions(store_manager_agent, prompt)
    if not new_layout:
        logger.error("Failed to generate a valid layout after retries.")
        return

    logger.info("AI Suggested Layout: %s", new_layout)

    # Ensure the new layout is a JSON object
    if isinstance(new_layout, dict) or isinstance(new_layout, list):
        logger.info("The new layout is a valid JSON object.")
    else:
        try:
            new_layout = json.loads(new_layout)  # Attempt to convert the string to JSON
            logger.info("The new layout string was successfully converted to a JSON object.")
        except json.JSONDecodeError as e:
            logger.error("Failed to convert the new layout string to JSON: %s", str(e))
            return

    update_response = store_connector.update_layout(new_layout)
    if update_response and update_response.get("success"):
        logger.info("Layout updated successfully.")
    else:
        logger.error("Failed to update the layout.")

    # Dump the new layout to a JSON file for testing
    # dump_layout_to_file(new_layout)

if __name__ == "__main__":
    main()