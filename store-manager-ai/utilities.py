import json
from logger.logger import logger

# testing prompt for POC
def get_prompt(current_layout):
    return f'''
    You are an AI assistant for managing store layouts. Your task is to analyze the current layout of items in the store and provide optimized layout instructions to improve customer experience and profits.
    Consider factors such as item placement, variety of item variants, and overall arrangement. 
    
    Here is the current layout:
    {current_layout}
    
    Provide an optimized layout in JSON format similar to this example:
    [
    {{ "itemId": "p1", "variant": "single" }},
    {{ "itemId": "p1", "variant": "double" }},
    {{ "itemId": "p1", "variant": "flyer" }}
    ]

    Only return the JSON array without any additional text.

    Each row in the layout looks good if the total number is divisible by 4, i.e. 4 singles, 2 doubles or 1 flyer. Arrange items to meet this requirement as much as possible.
    '''

# helper function for testing layout
def dump_layout_to_file(layout, filename="test_layout.json"):
    try:
        with open(filename, "w") as file:
            json.dump(layout, file, indent=4)
        logger.info("Test layout dumped to %s", filename)
    except Exception as e:
        logger.error("Failed to dump layout to file: %s", str(e))