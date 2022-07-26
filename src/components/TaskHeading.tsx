import React from "react";
import "./TaskHeading.css";

const TaskHeading = () => {
    return (
        <div className="taskheading">
            <div className={`taskheading-id `}>ID</div>
            <div className={`taskheading-details`}>
                <div className="taskheading-description">Name/Description</div>
                <div className="taskheading-status">Status</div>
                <div className="taskheading-status-checkbox">Is Done?</div>
                <div>Done / Complete / Total Dependencies</div>
                <div>Edit</div>
            </div>
        </div>
    );
};

export default TaskHeading;
