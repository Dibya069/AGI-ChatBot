import React from "react";
import DOMPurify from "dompurify";

const ChatDisplay = ({ messages }) => {
    return (
        <div className="chat-display">
        {messages.map((msg, index) => (
            <div key={index}>
            <p><strong>User:</strong> {msg.user}</p>
            <p><strong>AI:</strong> <div className="res-text" dangerouslySetInnerHTML = {{__html: DOMPurify.sanitize(msg.bot),}}/> </p>
            
            </div>
        ))}
        </div>
    );
};

export default ChatDisplay;
