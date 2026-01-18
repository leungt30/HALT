from flask import Flask, request, jsonify
from logger.logger import logger

app = Flask(__name__)

# In-memory storage for customer session data
customer_sessions = []

@app.route('/customer_session', methods=['POST'])
def receive_customer_session():
    """
    Endpoint to receive customer session data.
    Expects JSON payload with shopping event data.
    """
    try:
        session_data = request.get_json()
        if not session_data:
            return jsonify({"error": "Invalid or missing JSON payload."}), 400

        customer_sessions.append(session_data)
        logger.info("Received customer session data: %s", session_data)
        return jsonify({"message": "Customer session data received successfully."}), 200
    except Exception as e:
        logger.error("Error processing customer session data: %s", str(e))
        return jsonify({"error": "An error occurred while processing the request."}), 500

@app.route('/customer_sessions', methods=['GET'])
def get_customer_sessions():
    """
    Endpoint to fetch all customer session data.
    """
    return jsonify(customer_sessions), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)