import { TodoTypes } from "../Todo/Todo";

const addToRow = (item: TodoTypes, action: string) => {
    if (action === "active-task") {
        const db = getFirstColumn();
        let index = -1;

        for (let i = 0; i < db.length; i++) {
            if (db[i].id === item.id) {
                index = i;
            }
        }
        if (index > -1) {
            db[index] = item;
        } else {
            db.push(item)
        }
        saveToRow(db, action);

    } else if (action === "in-progress") {
        const db = getSecondColumn();

        let index = -1;

        for (let i = 0; i < db.length; i++) {
            if (db[i].id === item.id) {
                index = i;
            }
        }

        if (index > -1) {
            db[index] = item;
        } else {
            db.push(item)
        }

        saveToRow(db, action);

    } else if (action === "completed") {
        const db = getThirdColumn();

        let index = -1;

        for (let i = 0; i < db.length; i++) {
            if (db[i].id === item.id) {
                index = i;
            }
        }

        if (index > -1) {
            db[index] = item;
        } else {
            db.push(item)
        }

        saveToRow(db, action);
    }

    window.location.reload();
    return false;
}

const handleDid = (id: number, action: string) => {
    if (action === "active-task") {
        const getData = getFirstColumn();
        const db = getData.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t);
        saveToRow(db, action);
        window.location.reload();
        return false;
    } else if (action === "in-progress") {
        const getData = getSecondColumn();
        const db = getData.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t);
        saveToRow(db, action);
        window.location.reload();
        return false;
    } else if (action === "completed") {
        const getData = getThirdColumn();
        const db = getData.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t);
        saveToRow(db, action);
        window.location.reload();
        return false;
    }
}

const handleDelete = (id: number, action: string) => {
    if (action === "active-task") {
        const getData = getFirstColumn();
        const result = getData.filter(t => t.id !== id);
        saveToRow(result, action);
        window.location.reload();
        return false;
    } else if (action === "in-progress") {
        const getData = getSecondColumn();
        const result = getData.filter(t => t.id !== id);
        saveToRow(result, action);
        window.location.reload();
        return false;
    } else if (action === "completed") {
        const getData = getThirdColumn();
        const result = getData.filter(t => t.id !== id);
        saveToRow(result, action);
        window.location.reload();
        return false;
    }
}

const handleESubmit = (e: React.FormEvent, id: number, setEdit: React.Dispatch<React.SetStateAction<boolean>>, editTodo: string, action: string) => {
    e.preventDefault();

    if (action === "active-task") {
        const getData = getFirstColumn();
        const result = getData.map(t => t.id === id ? { ...t, todo: editTodo } : t);
        saveToRow(result, action);
        setEdit(false);
    } else if (action === "in-progress") {
        const getData = getSecondColumn();
        const result = getData.map(t => t.id === id ? { ...t, todo: editTodo } : t);
        saveToRow(result, action);
        setEdit(false);
    } else if (action === "completed") {
        const getData = getThirdColumn();
        const result = getData.map(t => t.id === id ? { ...t, todo: editTodo } : t);
        saveToRow(result, action);
        setEdit(false);
    }

    window.location.reload();
    return false;
}


const saveToRow = (db: TodoTypes[], action: string) => {
    const dbJSON = JSON.stringify(db);
    if (action === "active-task") {
        localStorage.setItem('first-column', dbJSON);
    } else if (action === "in-progress") {
        localStorage.setItem('second-column', dbJSON);
    } else if (action === "completed") {
        localStorage.setItem('third-column', dbJSON);
    }
}

const getFirstColumn = (): TodoTypes[] => {
    let firstColumnData = localStorage.getItem('first-column');
    return firstColumnData ? JSON.parse(firstColumnData) : [];
}

const getSecondColumn = (): TodoTypes[] => {
    let secondColumnData = localStorage.getItem('second-column');
    return secondColumnData ? JSON.parse(secondColumnData) : [];
}

const getThirdColumn = (): TodoTypes[] => {
    let thirdColumnData = localStorage.getItem('third-column');
    return thirdColumnData ? JSON.parse(thirdColumnData) : [];
}

export { getFirstColumn, getSecondColumn, getThirdColumn, saveToRow, addToRow, handleDid, handleDelete, handleESubmit };