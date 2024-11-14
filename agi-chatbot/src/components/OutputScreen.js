import React from "react";

const OutputScreen = ({ output }) => {
    return (
        <div className="output-screen">
        <h4>Output Screen</h4>
        <p>{output.join(" ")}</p>
        </div>
    );
};

export default OutputScreen;
