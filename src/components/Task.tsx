import { getUpdatedStatusesAfterToggle } from "../utilities/taskStatusUtitilies";
import "./Task.css";
import { AiTwotoneEdit } from "react-icons/ai";

const Task = ({
    task,
    taskId,
    taskList,
    setTaskList,
    nestingLevel,
    setTaskToEdit,
    setEditTaskModalVisible,
}: {
    task: any;
    taskId: number;
    taskList: any;
    setTaskList: Function;
    nestingLevel: number;
    setTaskToEdit: Function;
    setEditTaskModalVisible: Function;
}): JSX.Element => {
    function handleCheck(event: any): void {
        let newTaskList = getUpdatedStatusesAfterToggle(taskList, taskId);
        setTaskList((prevTaskList: any) => newTaskList);
    }
    function handleClickEdit(event: any): void {
        setTaskToEdit(taskId);
        setEditTaskModalVisible(true);
    }

    return (
        <>
            <div className={`task`}>
                <div
                    className={`task-id ${task.status
                        .toLowerCase()
                        .replace(" ", "")}`}
                    style={{ marginLeft: `${2 * nestingLevel}rem` }}
                >
                    {taskId}
                </div>
                <div
                    className={`task-details ${task.status
                        .toLowerCase()
                        .replace(" ", "")}`}
                >
                    <div className="task-description">{task.description}</div>
                    <div className="task-status">{task.status}</div>
                    <div className="task-status-checkbox">
                        Is Done?
                        <input
                            type="checkbox"
                            checked={task.status !== "IN PROGRESS"}
                            onChange={handleCheck}
                        />
                    </div>
                    {
                        <div>
                            {
                                taskList[taskId].childTasks.filter(
                                    (task: any) =>
                                        taskList[task].status === "DONE"
                                ).length
                            }{" "}
                            /{" "}
                            {
                                taskList[taskId].childTasks.filter(
                                    (task: any) =>
                                        taskList[task].status === "COMPLETE"
                                ).length
                            }{" "}
                            / {taskList[taskId].childTasks.length}
                        </div>
                    }
                    <button className="button-7" onClick={handleClickEdit}>
                        <AiTwotoneEdit />
                    </button>
                </div>
            </div>
            {taskList[taskId].childTasks.length !== 0 &&
                taskList[taskId].childTasks.map((task: number) => (
                    <Task
                        task={taskList[task]}
                        taskId={task}
                        taskList={taskList}
                        key={task}
                        setTaskList={setTaskList}
                        nestingLevel={nestingLevel + 1}
                        setTaskToEdit={setTaskToEdit}
                        setEditTaskModalVisible={setEditTaskModalVisible}
                    />
                ))}
        </>
    );
};

export default Task;
