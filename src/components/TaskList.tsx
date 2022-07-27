import React, { useState } from "react";
import CreateTask from "./CreateTask";
import Modal from "./Modal";
import Task from "./Task";
import TaskControlPlane from "./TaskControlPlane";
import TaskHeading from "./TaskHeading";
import "./TaskList.css";
const taskListTemp = {
    1: { description: "a", status: "DONE", parentTask: 3, childTasks: [2] },
    2: {
        description: "b",
        status: "IN PROGRESS",
        parentTask: 1,
        childTasks: [],
    },
    3: {
        description: "c",
        status: "COMPLETE",
        parentTask: null,
        childTasks: [1],
    },
    4: {
        description: "d",
        status: "COMPLETE",
        parentTask: null,
        childTasks: [],
    },
};

const TaskList = (): JSX.Element => {
    const [taskList, setTaskList] = useState(taskListTemp as any);
    const [filteredTaskList, setFilteredTaskList] = useState(taskList as any);
    const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
    const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(undefined);
    return (
        <>
            <div className="tasklist">
                <TaskControlPlane
                    setCreateTaskModalVisible={setCreateTaskModalVisible}
                    setFilteredTaskList={setFilteredTaskList}
                    taskList={taskList}
                />
                <TaskHeading />
                {Object.keys(filteredTaskList).map(
                    (taskId: string): JSX.Element => (
                        <Task
                            task={filteredTaskList[Number(taskId)]}
                            taskId={Number(taskId)}
                            key={Number(taskId)}
                            setTaskList={setTaskList}
                            taskList={taskList}
                            nestingLevel={0}
                            setTaskToEdit={setTaskToEdit}
                            setEditTaskModalVisible={setEditTaskModalVisible}
                        />
                    )
                )}
            </div>
            {createTaskModalVisible && (
                <Modal setModalVisibility={setCreateTaskModalVisible}>
                    <CreateTask
                        setTaskList={setTaskList}
                        setModalVisibility={setCreateTaskModalVisible}
                        isCreate={true}
                        taskList={taskList}
                    />
                </Modal>
            )}
            {editTaskModalVisible && (
                <Modal setModalVisibility={setEditTaskModalVisible}>
                    <CreateTask
                        setTaskList={setTaskList}
                        setModalVisibility={setEditTaskModalVisible}
                        isCreate={false}
                        taskToEdit={taskToEdit}
                        taskList={taskList}
                    />
                </Modal>
            )}
        </>
    );
};

export default TaskList;
