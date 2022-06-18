import { TodoTypes } from "../Todo/Todo";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './SingleTodo.css';
import { useEffect, useRef, useState } from "react";
import { addToCart } from "../LocalStorage/LocalStorage";

type SingleTodoTypes = {
    todo: TodoTypes;
    todos: TodoTypes[];
    setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
    // draggable?: boolean;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
    // dragData?: TodoTypes[];
    // setDragData?: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: SingleTodoTypes) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    // const [dragData, setDragData] = useState<TodoTypes[]>([]);

    const handleDone = (id: number) => {
        setTodos(todos.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t))
    }

    const handleDelete = (id: number) => {
        const result = todos.filter(t => t.id !== id);
        setTodos(result);
    }

    const handleEdit = () => {
        if (!edit && !todo.isDone) {
            setEdit(!edit);
        }
    }

    const handleESubmit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        const result = todos.map(t => t.id === id ? { ...t, todo: editTodo } : t);
        setTodos(result);

        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])


    const hadleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
        let result = todos.find(t => t.id === id);
        // const get = getCart();

        if (result) {
            // setDragData([...dragData, { id: result?.id, todo: result?.todo, isDone: result?.isDone }]);

            addToCart({ id: result?.id, todo: result?.todo, isDone: result?.isDone });
            let res = { id: result?.id, todo: result?.todo, isDone: result?.isDone }

            e.dataTransfer.setData("text/plain", JSON.stringify(res));
            // e.dataTransfer.effectAllowed = 'move';
            // console.log(e.dataTransfer.setData("text/plain", JSON.stringify(res)));


            // console.log("My ID:", dragData);
        }
        // setTodos(todos.filter(t => t.id !== id));
        // // console.log(typeof result);
        // setDragData(result);
        // e.dataTransfer.setData('text', `${id}`)
    }


    return (
        <div draggable onDragStart={e => hadleDragStart(e, todo.id)}>
            <form className="single_todos" onSubmit={e => handleESubmit(e, todo.id)}>
                {
                    edit ? <input
                        ref={inputRef}
                        className="single_todos-text"
                        value={editTodo}
                        onChange={e => setEditTodo(e.target.value)}
                    /> : todo.isDone ? <s className="single_todos-text">
                        {todo.todo}
                    </s> : <span className="single_todos-text">
                        {todo.todo}
                    </span>
                }
                <div>
                    <span onClick={handleEdit} className="icon">
                        <AiFillEdit />
                    </span>
                    <span onClick={() => handleDelete(todo.id)} className="icon">
                        <AiFillDelete />
                    </span>
                    <span onClick={() => handleDone(todo.id)} className="icon">
                        <MdDone />
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SingleTodo;