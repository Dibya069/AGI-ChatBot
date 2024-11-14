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

