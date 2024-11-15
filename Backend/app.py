from flask import Flask, request, render_template, jsonify, send_file
from flask_cors import CORS
import json
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
    thread_id = data.get("thread_id", 2)
    
    config = {"configurable": {"thread_id": str(thread_id)}}

    if user_input.lower() in ["quit", "q"]:
        return jsonify({"response": "Good Bye"})

    events = graph_memory.stream(
        {"messages": [("user", user_input)]}, config, stream_mode="values"
    )

    serialized_responses = []
    for event in events:
        # Convert each event to a dictionary that includes all metadata
        message = event["messages"][-1]
        
        # Prepare a serialized version with full metadata details
        serialized_message = {
            "id": message.id,
            "content": message.content,
        }
        
        # If the message has tool calls, add those as well
        if hasattr(message, 'tool_calls'):
            serialized_message["tool_calls"] = message.tool_calls

        serialized_responses.append(json.dumps(serialized_message))
        serialized_responses.append("==== Next Call =====")

    # Fetch snapshot and serialize it properly
    snapshot = graph_memory.get_state(config)
    existing_message = snapshot.values["messages"][-1]
    
    final_res = existing_message.content

    return jsonify({"response": final_res, "streamed_responses": serialized_responses})

@app.route('/new-thread', methods=['POST'])
def new_thread():
    global thread_counter
    thread_counter += 1
    return jsonify({"new_thread_id": thread_counter})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
