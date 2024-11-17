import React from "react";

const Sidebar = ({ threads, addNewThread, selectThread, currentThread }) => {
    return (
        <div className="sidebar">
            <button onClick={addNewThread} className="threads_button">Add New Thread</button>
            <div className="threads">
                {threads.map((thread) => (
                    <div 
                    key={thread} 
                    className={`thread ${currentThread === thread ? "active" : ""}`} 
                    onClick={() => selectThread(thread)}
                    >  {thread}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
