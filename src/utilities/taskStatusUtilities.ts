function getUpdatedStatusesAfterToggle(taskList: any, taskId: number): any {
    let tempStatus;
    let tempTaskList = JSON.parse(JSON.stringify(taskList));
    if (tempTaskList[taskId].childTasks.length === 0) {
        if (tempTaskList[taskId].status !== "IN PROGRESS") {
            tempStatus = "IN PROGRESS";
        } else {
            tempStatus = "COMPLETE";
        }
    } else {
        if (tempTaskList[taskId].status !== "IN PROGRESS") {
            tempStatus = "IN PROGRESS";
        } else {
            tempStatus = "DONE";
        }
    }
    tempTaskList = {
        ...tempTaskList,
        [taskId]: {
            ...tempTaskList[taskId],
            status: tempStatus,
        },
    };
    tempTaskList = resolveAndPropagate(tempTaskList, taskId);
    return tempTaskList;
}

function resolveAndPropagate(taskList: any, taskId: number): any {
    if (taskList[taskId].status !== "IN PROGRESS") {
        let tempStatus = "IN PROGRESS";
        if (allChildComplete(taskList, taskId)) {
            tempStatus = "COMPLETE";
        } else {
            tempStatus = "DONE";
        }

        taskList = {
            ...taskList,
            [taskId]: {
                ...taskList[taskId],
                status: tempStatus,
            },
        };
    }
    if (taskList[taskId].parentTask !== null) {
        return resolveAndPropagate(taskList, taskList[taskId].parentTask);
    } else {
        return taskList;
    }
}

function allChildComplete(taskList: any, taskId: number): boolean {
    for (let childTask of taskList[taskId].childTasks) {
        if (taskList[childTask].status !== "COMPLETE") {
            return false;
        }
    }
    return true;
}

function getValidParentIDs(taskList: any, taskId: number | undefined) : number[] {
    let res : number[] = [];
    Object.keys(taskList).forEach((currTaskId) => {
        if (taskList[Number(currTaskId)].parentTask === null && Number(currTaskId) !== taskId) {
            res = [...res, Number(currTaskId)];
            if (taskList[currTaskId].childTasks.length > 0) {
                res = [...res, ...getValidParentIDsRecursive(taskList, taskId, Number(currTaskId))]
            }
        }
    });
    return res;
}

function getValidParentIDsRecursive(taskList: any, taskId: number | undefined, currTaskId: number) : number[] {
    let res : number[] = [];
    taskList[currTaskId].childTasks.forEach((tempTaskId: number) => {
        if (Number(tempTaskId) !== taskId) {
            res = [...res, Number(tempTaskId)];
            if (taskList[tempTaskId].childTasks.length > 0) {
                res = [...res, ...getValidParentIDsRecursive(taskList, taskId, Number(tempTaskId))]
            }
        }
    });
    return res;
}

export { getUpdatedStatusesAfterToggle, resolveAndPropagate, getValidParentIDs };
