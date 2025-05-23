import http.server
import socketserver
import os

# Set the port
PORT = 8000

# Custom request handler to set CORS headers and correct MIME types
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def guess_type(self, path):
        # Add correct MIME types for JSON and Markdown files
        if path.endswith('.json'):
            return 'application/json'
        elif path.endswith('.md'):
            return 'text/markdown'
        return super().guess_type(path)

# Set up and start the server
Handler = CustomHandler
try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print("Press Ctrl+C to stop the server")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
except OSError as e:
    if e.errno == 98:  # Address already in use
        print(f"Port {PORT} is already in use. Try a different port.")
    else:
        raise
