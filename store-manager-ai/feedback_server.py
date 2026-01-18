#!/usr/bin/env python3
"""
Feedback Server - Real-time web-based display of customer AI feedback.
Serves a beautiful HTML page and pushes updates via SSE.
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
import json
import threading
import queue
from datetime import datetime

# Make the server handle each request in a new thread
class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

# Global queue for SSE messages
feedback_queue = queue.Queue()
sse_clients = []

HTML_PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Feedback</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            min-height: 100vh;
            color: #e0e0e0;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .header h1 {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(90deg, #00d4ff, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 4px;
        }
        
        .header .subtitle {
            font-size: 0.75rem;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .waiting {
            text-align: center;
            color: #666;
            font-size: 0.9rem;
            padding: 40px;
        }
        
        .waiting .dot {
            animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
        
        .feed {
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-height: calc(100vh - 120px);
            overflow-y: auto;
        }
        
        .card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 16px;
            animation: slideIn 0.3s ease-out;
            backdrop-filter: blur(10px);
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        
        .persona {
            font-weight: 600;
            font-size: 1rem;
            color: #fff;
        }
        
        .timestamp {
            font-size: 0.7rem;
            color: #666;
        }
        
        .score-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.85rem;
        }
        
        .score-high { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
        .score-mid { background: rgba(234, 179, 8, 0.2); color: #eab308; }
        .score-low { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
        
        .card-body {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .row {
            display: flex;
            gap: 8px;
            font-size: 0.85rem;
        }
        
        .row-icon {
            width: 20px;
            text-align: center;
        }
        
        .row-label {
            color: #888;
            min-width: 60px;
        }
        
        .row-value {
            color: #ccc;
            flex: 1;
        }
        
        .friction .row-value { color: #f97316; }
        .liked .row-value { color: #22c55e; }
        .exit .row-value { color: #94a3b8; }
        
        .iteration-header {
            background: linear-gradient(90deg, rgba(124,58,237,0.3), rgba(0,212,255,0.1));
            border-left: 3px solid #7c3aed;
            padding: 10px 16px;
            font-weight: 600;
            font-size: 0.9rem;
            color: #a78bfa;
            border-radius: 6px;
            margin-bottom: 4px;
        }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 Customer Feedback</h1>
        <div class="subtitle">Live Monitor</div>
    </div>
    
    <div id="feed" class="feed">
        <div class="waiting">
            <span class="dot">●</span> Waiting for customer feedback...
        </div>
    </div>
    
    <script>
        const feed = document.getElementById('feed');
        let firstFeedback = true;
        let currentIteration = 0;
        
        function getScoreClass(score) {
            if (score >= 7) return 'score-high';
            if (score >= 5) return 'score-mid';
            return 'score-low';
        }
        
        function formatLiked(liked) {
            if (Array.isArray(liked)) return liked.slice(0, 2).join(', ');
            return liked || 'N/A';
        }
        
        function addIterationHeader(iteration) {
            const header = document.createElement('div');
            header.className = 'iteration-header';
            header.innerHTML = `<span>🔄 Iteration ${iteration}</span>`;
            feed.insertBefore(header, feed.firstChild);
        }
        
        function addFeedback(data) {
            if (firstFeedback) {
                feed.innerHTML = '';
                firstFeedback = false;
            }
            
            // Add iteration header if iteration changed
            const iteration = data.iteration || 0;
            if (iteration > currentIteration) {
                currentIteration = iteration;
                addIterationHeader(iteration);
            }
            
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            const scoreClass = getScoreClass(data.score);
            
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <div>
                        <span class="persona">${data.persona || 'Customer'}</span>
                        <span class="timestamp">${time}</span>
                    </div>
                    <span class="score-badge ${scoreClass}">${data.score}/10</span>
                </div>
                <div class="card-body">
                    <div class="row friction">
                        <span class="row-icon">⚠️</span>
                        <span class="row-label">Friction</span>
                        <span class="row-value">${data.friction || 'N/A'}</span>
                    </div>
                    <div class="row liked">
                        <span class="row-icon">👍</span>
                        <span class="row-label">Liked</span>
                        <span class="row-value">${formatLiked(data.liked)}</span>
                    </div>
                    <div class="row exit">
                        <span class="row-icon">🚪</span>
                        <span class="row-label">Exit</span>
                        <span class="row-value">${data.exit_reason || 'N/A'}</span>
                    </div>
                </div>
            `;
            
            // Insert after the latest iteration header
            const headers = feed.querySelectorAll('.iteration-header');
            if (headers.length > 0) {
                const latestHeader = headers[0];
                latestHeader.insertAdjacentElement('afterend', card);
            } else {
                feed.insertBefore(card, feed.firstChild);
            }
            
            // Keep only last 15 items
            while (feed.children.length > 15) {
                feed.removeChild(feed.lastChild);
            }
        }
        
        // Connect to SSE
        const evtSource = new EventSource('/events');
        evtSource.onmessage = function(event) {
            try {
                const data = JSON.parse(event.data);
                addFeedback(data);
            } catch (e) {
                console.error('Parse error:', e);
            }
        };
        
        evtSource.onerror = function() {
            console.log('SSE connection error, retrying...');
        };
    </script>
</body>
</html>
'''

class FeedbackHandler(BaseHTTPRequestHandler):
    """HTTP request handler for feedback endpoint."""
    
    def log_message(self, format, *args):
        """Suppress default logging."""
        pass
    
    def do_GET(self):
        """Handle GET requests."""
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(HTML_PAGE.encode('utf-8'))
        elif self.path == '/events':
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Register this client
            client_queue = queue.Queue()
            sse_clients.append(client_queue)
            
            try:
                while True:
                    try:
                        data = client_queue.get(timeout=30)
                        self.wfile.write(f"data: {json.dumps(data)}\n\n".encode('utf-8'))
                        self.wfile.flush()
                    except queue.Empty:
                        # Send keepalive
                        self.wfile.write(b": keepalive\n\n")
                        self.wfile.flush()
            except (BrokenPipeError, ConnectionResetError):
                pass
            finally:
                sse_clients.remove(client_queue)
        elif self.path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'OK')
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        """Handle POST requests."""
        if self.path == '/feedback':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            
            try:
                data = json.loads(body.decode('utf-8'))
                
                # Broadcast to all SSE clients
                for client_queue in sse_clients:
                    client_queue.put(data)
                
                # Also print to console
                print(f"[{datetime.now().strftime('%H:%M:%S')}] Feedback: {data.get('persona')} - {data.get('score')}/10")
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"status": "ok"}')
            except json.JSONDecodeError:
                self.send_response(400)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

def main():
    port = 8001
    server = ThreadedHTTPServer(('0.0.0.0', port), FeedbackHandler)
    
    print(f"\n🎯 Feedback Display Server")
    print(f"   Open: http://localhost:{port}")
    print(f"   Waiting for feedback...\n")
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down...")
        server.shutdown()

if __name__ == "__main__":
    main()
