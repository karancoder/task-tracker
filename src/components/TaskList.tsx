import React, { useState } from "react";
import CreateTask from "./CreateTask";
import Modal from "./Modal";
import Task from "./Task";
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
    const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
    const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(undefined);

    function openCreateTaskModal(event: any) {
        setCreateTaskModalVisible(true);
    }
    return (
        <>
            <div className="tasklist">
                <div className="taskcontrolplane">
                    <button className="button-1" onClick={openCreateTaskModal}>
                        Create Task!
                    </button>
                </div>
                <TaskHeading />
                {Object.keys(taskList).map(
                    (taskId: string): JSX.Element =>
                        taskList[Number(taskId)].parentTask === null ? (
                            <Task
                                task={taskList[Number(taskId)]}
                                taskId={Number(taskId)}
                                key={Number(taskId)}
                                setTaskList={setTaskList}
                                taskList={taskList}
                                nestingLevel={0}
                                setTaskToEdit={setTaskToEdit}
                                setEditTaskModalVisible={
                                    setEditTaskModalVisible
                                }
                            />
                        ) : (
                            <></>
                        )
                )}
            </div>
            {createTaskModalVisible && (
                <Modal setModalVisiblity={setCreateTaskModalVisible}>
                    <CreateTask
                        setTaskList={setTaskList}
                        setModalVisiblity={setCreateTaskModalVisible}
                        isCreate={true}
                        taskList={taskList}
                    />
                </Modal>
            )}
            {editTaskModalVisible && (
                <Modal setModalVisiblity={setEditTaskModalVisible}>
                    <CreateTask
                        setTaskList={setTaskList}
                        setModalVisiblity={setEditTaskModalVisible}
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
