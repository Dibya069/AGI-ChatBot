from flask import Flask, request, render_template, jsonify, send_file
from flask_cors import CORS
import requests

from Backend.components.graphBuild import graph_memory


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Welcome to my Flask App!'

thread_counter = 1

@app.route('/agi-cb', methods=['POST'])
def agi_cb():
    global thread_counter
    data = request.json
    user_input = data.get("message", "")
    thread_id = data.get("thread_id", 1)
    
    config = {"configurable": {"thread_id": str(thread_id)}}

    if user_input.lower() in ["quit", "q"]:
        return jsonify({"response": "Good Bye"})

    events = graph_memory.stream(
        {"messages": [("user", user_input)]}, config, stream_mode="values"
    )

    responses = []
    for event in events:
        # Capture each message response in a serializable format
        message = event["messages"][-1].pretty_print()
        if isinstance(message, (str, int, float, list, dict)):
            responses.append(message)
        else:
            responses.append(str(message))  # Convert non-serializable types to string

    # Fetch snapshot and serialize it properly
    snapshot = graph_memory.get_state(config)
    final_response = snapshot.values["messages"][-1].pretty_print()
    
    if not isinstance(final_response, (str, int, float, list, dict)):
        final_response = str(final_response)

    return jsonify({"response": final_response, "streamed_responses": responses})

@app.route('/new-thread', methods=['POST'])
def new_thread():
    global thread_counter
    thread_counter += 1
    return jsonify({"new_thread_id": thread_counter})
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
