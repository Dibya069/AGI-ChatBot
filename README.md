# AGI Chatbot
## Overview
The AGI Chatbot is a simple conversational AI that allows users to engage in a chat with an artificial intelligence system. Built with a Flask backend and a React frontend, the chatbot simulates an interactive conversation by processing user input and generating responses in real-time.

...

Features
- Interactive chat interface with conversation threading.
- Flask backend with AI processing capabilities.
- React-based frontend for user interaction.
- Threaded conversations allowing users to switch contexts.
...

Tech Stack
- Backend: Flask, Python
- Frontend: React, JavaScript
- Additional Libraries: Flask-CORS, requests, and custom AI processing components.
...

Project Structure
```
AGI_Chatbot/
│
├── Backend/
│   ├── app.py               # Main Flask backend file
│   └── components/
│       └── graphBuild.py    # AI processing component
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── ChatApp.js       # Component handling chat logic
│   │   ├── ChatDisplay.js   # Component to display conversation
│   │   └── index.js         # React entry point
│   └── package.json         # React dependencies
│
├── requirements.txt         # Python dependencies
└── README.md                # Project documentation

```

## Getting Started
### Prerequisites
- Python 3.10 or higher
- Node.js and npm for React frontend
- Flask and Flask-CORS

### Installation
#### Backend Setup
1. Clone the repository:
```
git clone https://github.com/Dibya069/AGI-ChatBot.git
cd AGI_ChatBot
```

2. Create a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Run the Flask server:
```
python Backend/app.py
```

#### Frontend Setup
1. Navigate to the frontend directory:
```cd frontend```

2. Install frontend dependencies:
```npm install```

3. Run the React development server:
```npm start```

The frontend should be running at `http://localhost:3000`, and the backend API should be accessible at `http://localhost:5000`.

## Usage
- Start a Conversation: Enter text in the input box and click "Send". The response from the AI will appear in the chat display area.
- Add New Thread: Click the "+" button to start a new conversation thread, which assigns a new thread ID for independent conversation flow.

## API Endpoints
`POST /agi-cb`
- Description: Processes user input and returns a response from the AI.
- Request Body:
```
{
    "message": "User's input message",
    "thread_id": 1  // Thread ID for the conversation
}
```
- Response:
```
{
    "response": "AI response to the user's message"
}
```

`POST /new-thread`
- Description: Creates a new conversation thread.
- Response:
```
{
    "new_thread_id": 2  // ID of the newly created thread
}
```

#### Frontend Components
- App.js: Main React component rendering the ChatApp.
- ChatApp.js: Handles user input, API calls, and thread management.
- ChatDisplay.js: Displays the chat conversation between the user and AI.

#### Known Issues
- Ensure the Flask backend is running on localhost:5000 to avoid CORS issues.
- TypeError: If you encounter "TypeError: msg.bot.join is not a function," ensure that the response from the backend is properly formatted.

#### Future Enhancements
- Add more AI processing capabilities and refine response quality.
- Implement a more advanced conversation threading system.
- Add support for persistent chat history and user authentication.

#### License
- This project is licensed under the MIT License.