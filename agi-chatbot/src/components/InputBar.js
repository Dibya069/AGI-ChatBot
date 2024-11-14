import React, { useState } from "react";

const InputBar = ({ sendMessage }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
        sendMessage(input);
        setInput("");
        }
    };

    return (
        <form className="input-bar" onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Ask your doubt to the chatbot"
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
        </form>
    );
};

export default InputBar;
