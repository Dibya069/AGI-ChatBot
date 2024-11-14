import React from "react";

const ChatDisplay = ({ messages }) => {
    return (
        <div className="chat-display">
        {messages.map((msg, index) => (
            <div key={index}>
            <p><strong>User:</strong> {msg.user}</p>
            <p><strong>AI:</strong> {msg.bot}</p>
            </div>
        ))}
        </div>
    );
};

export default ChatDisplay;
