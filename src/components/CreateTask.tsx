import React, { useState } from "react";
import {
    getValidParentIDs,
    resolveAndPropagate,
} from "../utilities/taskStatusUtilities";
import "./CreateTask.css";

const CreateTask = ({
    setTaskList,
    setModalVisibility,
    taskToEdit,
    isCreate,
    taskList,
}: {
    setTaskList: Function;
    setModalVisibility: Function;
    taskToEdit?: number;
    isCreate: boolean;
    taskList: any;
}) => {
    const [formData, setFormData] = useState({
        taskName: "",
        parentTaskID: "",
    });

    function handleChange(event: any) {
        setFormData((oldFormData) => {
            return { ...oldFormData, [event.target.name]: event.target.value };
        });
    }

    function handleCreateClick(event: any) {
        event.preventDefault();
        let newTaskID =
            Math.floor(new Date().getTime() / 1000) %
            Math.floor(new Date("2022-07-27").getTime() / 1000);
        patchTaskIntoTaskList(setTaskList, formData, newTaskID);
        setModalVisibility(false);
    }

    function handleEditClick(event: any) {
        event.preventDefault();
        if (taskToEdit !== undefined) {
            patchTaskIntoTaskList(setTaskList, formData, taskToEdit);
        }
        setModalVisibility(false);
    }

    return (
        <form
            className="create-task"
            onSubmit={isCreate ? handleCreateClick : handleEditClick}
        >
            <h1>{isCreate ? "Create" : "Update"} Task!</h1>
            <div className="create-task-form">
                <label htmlFor="task-name">Task Name:</label>
                <input
                    type="text"
                    id="task-name"
                    placeholder="Complete front page..."
                    name="taskName"
                    value={formData.taskName}
                    required
                    onChange={handleChange}
                />
            </div>
            <div className="create-task-form">
                <label htmlFor="parent-task-id">Parent Task ID:</label>
                <select
                    name="parentTaskID"
                    id="parent-task-id"
                    value={formData.parentTaskID}
                    onChange={handleChange}
                >
                    {["", ...getValidParentIDs(taskList, taskToEdit)].map(
                        (taskId) => (
                            <option value={taskId} key={taskId}>
                                {taskId !== "" ? taskId : "No Parent Task"}
                            </option>
                        )
                    )}
                </select>
            </div>
            {isCreate ? (
                <button className="button-3">Create!</button>
            ) : (
                <button className="button-3">Update!</button>
            )}
        </form>
    );
};

export default CreateTask;

function patchTaskIntoTaskList(
    setTaskList: Function,
    formData: { taskName: string; parentTaskID: string },
    newTaskID: number
) {
    setTaskList((oldTaskList: any) => {
        let newTaskList;
        let hasNewParent = formData.parentTaskID !== "";
        let oldParent = null;
        let isEdit = oldTaskList.hasOwnProperty(newTaskID);
        if (hasNewParent) {
            let newParentID = Number(formData.parentTaskID);
            if (isEdit) {
                oldParent = oldTaskList[newTaskID].parentTask;
                if (oldParent !== null) {
                    newTaskList = {
                        ...oldTaskList,
                        [newTaskID]: {
                            ...oldTaskList[newTaskID],
                            description: formData.taskName,
                            parentTask: newParentID,
                        },
                        [oldParent]: {
                            ...oldTaskList[oldParent],
                            childTasks: [
                                ...oldTaskList[oldParent].childTasks.filter(
                                    (oldParentsChildTask: any) =>
                                        oldParentsChildTask !== newTaskID
                                ),
                            ],
                        },
                        [newParentID]: {
                            ...oldTaskList[newParentID],
                            childTasks: [
                                ...new Set([
                                    ...oldTaskList[newParentID].childTasks,
                                    newTaskID,
                                ]),
                            ],
                        },
                    };
                } else {
                    newTaskList = {
                        ...oldTaskList,
                        [newTaskID]: {
                            ...oldTaskList[newTaskID],
                            description: formData.taskName,
                            parentTask: newParentID,
                        },
                        [newParentID]: {
                            ...oldTaskList[newParentID],
                            childTasks: [
                                ...new Set([
                                    ...oldTaskList[newParentID].childTasks,
                                    newTaskID,
                                ]),
                            ],
                        },
                    };
                }
            } else {
                newTaskList = {
                    ...oldTaskList,
                    [newTaskID]: {
                        description: formData.taskName,
                        parentTask: newParentID,
                        childTasks: [],
                        status: "IN PROGRESS",
                    },
                    [newParentID]: {
                        ...oldTaskList[newParentID],
                        childTasks: [
                            ...new Set([
                                ...oldTaskList[newParentID].childTasks,
                                newTaskID,
                            ]),
                        ],
                    },
                };
            }
        } else {
            if (isEdit) {
                oldParent = oldTaskList[newTaskID].parentTask;
                if (oldParent !== null) {
                    newTaskList = {
                        ...oldTaskList,
                        [newTaskID]: {
                            ...oldTaskList[newTaskID],
                            description: formData.taskName,
                            parentTask: null,
                        },
                        [oldParent]: {
                            ...oldTaskList[oldParent],
                            childTasks: [
                                ...oldTaskList[oldParent].childTasks.filter(
                                    (oldParentsChildTask: any) =>
                                        oldParentsChildTask !== newTaskID
                                ),
                            ],
                        },
                    };
                } else {
                    newTaskList = {
                        ...oldTaskList,
                        [newTaskID]: {
                            ...oldTaskList[newTaskID],
                            description: formData.taskName,
                            parentTask: null,
                        },
                    };
                }
            } else {
                newTaskList = {
                    ...oldTaskList,
                    [newTaskID]: {
                        description: formData.taskName,
                        parentTask: null,
                        childTasks: [],
                        status: "IN PROGRESS",
                    },
                };
            }
        }
        newTaskList = resolveAndPropagate(newTaskList, newTaskID);
        if (isEdit && oldParent !== null) {
            newTaskList = resolveAndPropagate(newTaskList, oldParent);
        }
        return newTaskList;
    });
}
