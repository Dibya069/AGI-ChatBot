import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatDisplay from "./components/ChatDisplay";
import OutputScreen from "./components/OutputScreen";
import InputBar from "./components/InputBar";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [output, setOutput] = useState([]);
  const [threadId, setThreadId] = useState(1);

  const addNewThread = async () => {
    const response = await axios.post("http://localhost:5000/new-thread");
    setThreadId(response.data.new_thread_id);
    setMessages([]); // Clear messages for the new thread
  };

  const sendMessage = async (message) => {
    const response = await axios.post("http://localhost:5000/agi-cb", {
      message: message,
      thread_id: threadId,
    });

    const streamedResponses = response.data.streamed_responses;
    const finalResponse = response.data.response;

    setMessages([...messages, { user: message, bot: finalResponse }]);
    setOutput(streamedResponses); // Set streamed responses in output screen
  };

  return (
    <div className="container">
      <Sidebar addNewThread={addNewThread} />
      <div className="chat-container">
        <h1 className="title">AGI Chatbot</h1>
        <ChatDisplay messages={messages} />
        <InputBar sendMessage={sendMessage} />
      </div>
      <OutputScreen output={output} />
    </div>
  );
}

export default App;
