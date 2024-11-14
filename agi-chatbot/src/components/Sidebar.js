import React from "react";

const Sidebar = ({ addNewThread }) => {
    return (
        <div className="sidebar">
        <button onClick={addNewThread}>+</button>
        <div className="threads">
            <div className="thread">Thread 1</div>
            <div className="thread">Thread 2</div>
            {/* Display threads dynamically */}
        </div>
        </div>
    );
};

export default Sidebar;
