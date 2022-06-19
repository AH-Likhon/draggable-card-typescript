import { TodoTypes } from "../Todo/Todo";

const addToCart = (item: any) => {
    const db = getCart();

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

    saveToCart(db);
}

// const removeFromCart = item => {
//     const db = getCart();
//     if (item in db) {
//         db[item] = db[item] - 1;
//         if (db[item] === 0) {
//             delete db[item];
//         }
//     }

//     saveToCart(db);
// }

const saveToCart = (db: any) => {
    const dbJSON = JSON.stringify(db);
    localStorage.setItem('shopping-cart', dbJSON);
}

const getCart = () => {
    let savedData = localStorage.getItem('shopping-cart');
    return savedData ? JSON.parse(savedData) : [];
}


// first Column

const addToRow = (item: any) => {
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

    saveToRow(db);
}

const handleDid = (id: number) => {
    const getData = getFirstColumn();
    const db = getData.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t);
    saveToRow(db);
    window.location.reload();
    return false;
}

const handleDelete = (id: number) => {
    const getData = getFirstColumn();
    const result = getData.filter(t => t.id !== id);
    saveToRow(result);
    window.location.reload();
    return false;
}

const handleESubmit = (e: React.FormEvent, id: number, setEdit: React.Dispatch<React.SetStateAction<boolean>>, editTodo: string) => {
    e.preventDefault();
    const getData = getFirstColumn();

    const result = getData.map(t => t.id === id ? { ...t, todo: editTodo } : t);
    saveToRow(result);

    setEdit(false);

    window.location.reload();
    return false;
}


const saveToRow = (db: TodoTypes[]) => {
    const dbJSON = JSON.stringify(db);
    localStorage.setItem('first-column', dbJSON);
}

const getFirstColumn = (): TodoTypes[] => {
    let firstColumnData = localStorage.getItem('first-column');
    return firstColumnData ? JSON.parse(firstColumnData) : [];
}

export { addToCart, getCart, getFirstColumn, addToRow, handleDid, handleDelete, handleESubmit };