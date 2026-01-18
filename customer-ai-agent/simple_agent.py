"""
Simple Agent Simulator - Simulates customer clicks and tracks them
Sends click data to backend API
"""

import requests
import json
import time
import random
from datetime import datetime

BACKEND_URL = "http://localhost:3000"

# Sample personas and products for simulation
PERSONAS = [
    {
        "name": "Alex Chen",
        "goal": "Finding tech accessories under budget",
        "budget": 300,
        "product_preferences": ["p2", "p6", "p14", "p30", "p49"]
    },
    {
        "name": "Maria Santos",
        "goal": "Looking for premium gifts",
        "budget": 500,
        "product_preferences": ["p4", "p26", "p27", "p35"]
    },
    {
        "name": "James Wilson",
        "goal": "Casual browsing, impulse buying",
        "budget": 150,
        "product_preferences": ["p1", "p3", "p7", "p9"]
    }
]

PRODUCTS = {
    "p1": {"name": "Neon Cyber Jacket", "price": 120.00},
    "p2": {"name": "Holo-Visor Cap", "price": 45.00},
    "p3": {"name": "Quantum Sneakers", "price": 180.00},
    "p4": {"name": "Neural Interface Headset", "price": 350.00},
    "p6": {"name": "Cyberpunk Shades", "price": 60.00},
    "p7": {"name": "Mechanical Keyboard", "price": 150.00},
    "p9": {"name": "Smart Watch", "price": 299.00},
    "p14": {"name": "Data Chip Set", "price": 25.00},
    "p26": {"name": "Pixel Heart Pendant", "price": 85.00},
    "p27": {"name": "Love Bot", "price": 600.00},
    "p30": {"name": "Neural Link Cable", "price": 20.00},
    "p35": {"name": "Portable Reactor", "price": 5000.00},
    "p49": {"name": "Wireless Charger Pad", "price": 30.00},
}

def send_click(action, item_id=None):
    """Send a click event to the backend"""
    item_data = PRODUCTS.get(item_id, {}) if item_id else {}
    
    payload = {
        "action": action,
        "itemId": item_id or "N/A",
        "itemName": item_data.get("name", "N/A"),
        "itemPrice": item_data.get("price", "N/A"),
        "target": "Add to Cart" if action == "add-to-cart" else ("Remove" if action == "remove-from-cart" else ("Cart" if action == "open-cart" else "Checkout")),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/api/track", json=payload)
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error sending click: {e}")
        return False

def simulate_agent():
    """Simulate an agent browsing and clicking"""
    persona = random.choice(PERSONAS)
    
    print("\n" + "="*70)
    print("🤖 AGENT SIMULATION STARTED")
    print("="*70)
    print(f"\nAgent: {persona['name']}")
    print(f"Goal: {persona['goal']}")
    print(f"Budget: ${persona['budget']}")
    print(f"Preferences: {len(persona['product_preferences'])} product types\n")
    print("="*70)
    print("TRACKING CLICKS...")
    print("="*70 + "\n")
    
    # Simulate browsing and clicking
    clicks_made = 0
    checked_out = False
    cart_items = []
    
    # Simulate browsing and adding to cart
    for i in range(random.randint(3, 7)):
        # Pick a product
        product_id = random.choice(persona['product_preferences'])
        
        # Check if we have enough budget
        product_price = PRODUCTS.get(product_id, {}).get("price", 0)
        current_spend = sum(PRODUCTS.get(p, {}).get("price", 0) for p in cart_items)
        
        if current_spend + product_price <= persona['budget']:
            print(f"⏳ Agent browsing... found {PRODUCTS[product_id]['name']}")
            time.sleep(1.5)
            
            # Send click
            if send_click("add-to-cart", product_id):
                print(f"✅ Clicked: ADD TO CART - {PRODUCTS[product_id]['name']} (${product_price})\n")
                cart_items.append(product_id)
                clicks_made += 1
            else:
                print(f"⚠️  Failed to track click\n")
        else:
            print(f"⏭️  Skipping {PRODUCTS[product_id]['name']} - Over budget\n")
        
        time.sleep(0.5)
    
    # Open cart to view items
    if cart_items and random.random() > 0.3:
        print(f"⏳ Agent opens cart to review...")
        time.sleep(0.5)
        
        if send_click("open-cart"):
            print(f"✅ Clicked: OPEN CART\n")
            clicks_made += 1
        
        # Randomly remove an item
        if len(cart_items) > 1 and random.random() > 0.6:
            item_to_remove = random.choice(cart_items)
            item_name = PRODUCTS.get(item_to_remove, {}).get("name", "Unknown")
            
            print(f"⏳ Agent removes item from cart...")
            time.sleep(0.5)
            
            if send_click("remove-from-cart", item_to_remove):
                print(f"✅ Clicked: REMOVE - {item_name}\n")
                cart_items.remove(item_to_remove)
                clicks_made += 1
    
    # Checkout
    if cart_items:
        print(f"⏳ Agent reviewing cart ({len(cart_items)} items)...")
        time.sleep(1)
        
        if send_click("checkout"):
            print(f"✅ Clicked: CHECKOUT\n")
            clicks_made += 1
            checked_out = True
        else:
            print(f"⚠️  Failed to track checkout\n")
    
    # Summary
    print("="*70)
    print("SESSION SUMMARY")
    print("="*70)
    print(f"Agent: {persona['name']}")
    print(f"Total clicks tracked: {clicks_made}")
    print(f"Items in cart: {len(cart_items)}")
    print(f"Total spent: ${sum(PRODUCTS.get(p, {}).get('price', 0) for p in cart_items):.2f}")
    print(f"Checked out: {'✅ Yes' if checked_out else '❌ No'}")
    print("="*70 + "\n")

if __name__ == "__main__":
    print("\n🚀 Starting Agent Click Tracker...\n")
    
    # Run a few simulated agents
    num_agents = 1
    print(f"Simulating {num_agents} agent session(s)\n")
    
    for i in range(num_agents):
        simulate_agent()
        if i < num_agents - 1:
            time.sleep(2)
    
    print("✨ All agent sessions completed!")
    print("Check the backend terminal for detailed tracking logs.\n")
