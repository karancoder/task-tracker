import React, { useEffect, useState } from "react";
import "./TaskControlPlane.css";

const TaskControlPlane = ({
    setCreateTaskModalVisible,
    taskList,
    setFilteredTaskList,
}: {
    setCreateTaskModalVisible: Function;
    taskList: any;
    setFilteredTaskList: Function;
}) => {
    const [selectedFilter, setSelectedFilter] = useState("");

    function handleFilterChange(event: any) {
        setSelectedFilter(event.target.value);
    }

    useEffect(() => {
        setFilteredTaskList(() => {
            let newFilteredTaskList: any = {};
            Object.keys(taskList).forEach((task: any) => {
                if (
                    taskList[task].parentTask === null &&
                    (selectedFilter === "" ||
                        taskList[task].status === selectedFilter)
                )
                    newFilteredTaskList[task] = taskList[task];
            });
            return newFilteredTaskList;
        });
    }, [selectedFilter, setFilteredTaskList, taskList]);

    function openCreateTaskModal(event: any) {
        setCreateTaskModalVisible(true);
    }
    return (
        <div className="taskcontrolplane">
            <button className="button-1" onClick={openCreateTaskModal}>
                Create Task!
            </button>
            <div className="filter">
                <label htmlFor="filter-select-id">Filter:</label>
                <select
                    name="selectedFilter"
                    id="filter-select-id"
                    value={selectedFilter}
                    onChange={handleFilterChange}
                >
                    <option value="">All</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                    <option value="COMPLETE">Complete</option>
                </select>
            </div>
        </div>
    );
};

export default TaskControlPlane;
