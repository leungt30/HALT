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

    I want all 50 items in the page to be present in the new layout, but feel free to change their variants (single, double, flyer) and their order to optimize the layout.
    '''

def get_optimization_prompt(current_layout, feedback_summary, average_score, customer_actions):
    return f'''
    You are an AI Store Manager optimizing a retail website layout.
    
    Your goal is to improve Customer Satisfaction (current average: {average_score}/10).
    Target score: > 8.0/10.

    CURRENT LAYOUT:
    {json.dumps(current_layout, indent=2)}

    CUSTOMER FEEDBACK FROM LAST ITERATION:
    {feedback_summary}

    CUSTOMER ACTIONS FROM LAST ITERATION:
    {json.dumps(customer_actions, indent=2)}

    INSTRUCTIONS:
    1. Analyze customer actions to identify:
       - Frequently viewed or purchased items (promote these items).
       - Items that customers abandoned or ignored (reposition or replace these items).
       - Patterns in customer browsing behavior (e.g., confusion
    2. Analyze the customer feedback to identify friction points (e.g., "confusion", "couldn't find items", "no bundles").
    3. Modify the layout to address these issues.
       - If they want bundles, add "flyer" or "double" variants.
       - If they are confused/scrolling too much, maybe group similar items using CATEGORIES.
       - "single" takes 1 slot. "double" takes 2 slots. "flyer" takes 4 slots.
    4. CATEGORY HEADERS:
       - You can insert category headers to organize sections.
       - Format: {{ "type": "category", "name": "Section Name", "id": "section-id" }}
       - Categories take up a full row visual break.
    5. CONSTRAINT: The total width of the layout is a grid. Ideally, rows (between categories) should sum to 4 slots (e.g., 4 singles, 2 doubles, 1 flyer). 
       Try to organize items so they form complete rows.

    Provide the NEW optimized layout in strictly JSON format array. 
    Example Item: {{ "itemId": "p1", "variant": "single" }}
    Example Category: {{ "type": "category", "name": "New Arrivals", "id": "new-arrivals" }}
    
    Do not output markdown code blocks. Just the raw JSON array.
    '''


# helper function for testing layout
def dump_layout_to_file(layout, filename="test_layout.json"):
    try:
        with open(filename, "w") as file:
            json.dump(layout, file, indent=4)
        logger.info("Test layout dumped to %s", filename)
    except Exception as e:
        logger.error("Failed to dump layout to file: %s", str(e))