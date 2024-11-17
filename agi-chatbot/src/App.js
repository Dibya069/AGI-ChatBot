import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatDisplay from "./components/ChatDisplay";
import OutputScreen from "./components/OutputScreen";
import InputBar from "./components/InputBar";
import axios from "axios";
import "./App.css";

function App() {
    const initialThreadId = new Date().toISOString(); // Initialize with current datetime
    const [threads, setThreads] = useState([initialThreadId]); // Start with a datetime-based thread ID
    const [currentThread, setCurrentThread] = useState(initialThreadId);
    const [messages, setMessages] = useState({ [initialThreadId]: [] }); // Store messages per thread
    const [output, setOutput] = useState([]);

    const addNewThread = async () => {
        //const response = await axios.post("http://localhost:5000/new-thread");
        const newThreadId = initialThreadId; // Datetime string
        setThreads([...threads, newThreadId]); // Add thread ID to the list
        setCurrentThread(newThreadId); // Set the new thread as active
        setMessages((prevMessages) => ({
          ...prevMessages,
          [newThreadId]: [], // Create an empty message array for the new thread
        }));
    };

    const selectThread = (threadId) => {
        setCurrentThread(threadId); // Switch to the selected thread
    };

    const sendMessage = async (message) => {
        const response = await axios.post("http://localhost:5000/agi-cb", {
            message: message,
            thread_id: currentThread, // Pass the current thread ID (datetime string)
        });

        const streamedResponses = response.data.streamed_responses;
        const finalResponse = response.data.response;

        setMessages((prevMessages) => ({
          ...prevMessages,
          [currentThread]: [
              ...(prevMessages[currentThread] || []),
              { user: message, bot: finalResponse },
          ],
        }));
        setOutput(streamedResponses); // Set streamed responses in output screen
    };

    return (
        <div className="container">
            <Sidebar
                threads={threads}
                addNewThread={addNewThread}
                selectThread={selectThread}
                currentThread={currentThread}
            />
            <div className="chat-container">
                <h1 className="title">AGI Chatbot</h1>
                <ChatDisplay messages={messages[currentThread] || []} />
                <InputBar sendMessage={sendMessage} />
            </div>
            <OutputScreen output={output} />
        </div>
    );
}

export default App;
