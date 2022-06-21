import { TodoTypes } from "../Todo/Todo";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './SingleTodo.css';
import { useEffect, useRef, useState } from "react";
import { getSecondColumn, getFirstColumn, handleDelete, handleDid, handleESubmit, addToRow, getThirdColumn } from "../LocalStorage/LocalStorage";
import Swal from "sweetalert2";

type SingleTodoTypes = {
    action: "active-task" | "in-progress" | "completed";
    todo: TodoTypes;
    // todos: TodoTypes[];
    // setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
}

const SingleTodo = ({ todo, action }: SingleTodoTypes) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const getFirstColumnData = getFirstColumn();
    const getSecondColumnData = getSecondColumn();
    const getThirdColumnData = getThirdColumn();

    const handleEdit = () => {
        if (!edit && !todo.isDone) {
            setEdit(!edit);
        } else {
            Swal.fire({
                icon: 'error',
                // title: 'Oops...',
                text: "Locked file is not editable😥 Unlock it First!",
            })
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])


    const hadleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number, action: string) => {
        if (action === "active-task") {
            let result = getFirstColumnData.find(t => t.id === id);

            console.log(result);

            if (result && !result.isDone) {
                let res = { id: result?.id, todo: result?.todo, isDone: result?.isDone, action }
                e.dataTransfer.setData("text/plain", JSON.stringify(res));

                addToRow({ id: result?.id, todo: result?.todo, isDone: result?.isDone }, action);
                // e.dataTransfer.effectAllowed = 'move';
            } else {
                Swal.fire({
                    icon: 'error',
                    // title: 'Oops...',
                    text: "Locked file is not draggable😥 Unlock it First!",
                })

            }
        } else if (action === "in-progress") {
            let result = getSecondColumnData.find(t => t.id === id);

            console.log(result);

            if (result && !result.isDone) {
                let res = { id: result?.id, todo: result?.todo, isDone: result?.isDone, action }
                e.dataTransfer.setData("text/plain", JSON.stringify(res));

                addToRow({ id: result?.id, todo: result?.todo, isDone: result?.isDone }, action);
            } else {
                Swal.fire({
                    icon: 'error',
                    // title: 'Oops...',
                    text: "Locked file is not draggable😥 Unlock it First!",
                })
            }
        } else if (action === "completed") {
            let result = getThirdColumnData.find(t => t.id === id);

            console.log(result);

            if (result && result.isDone) {
                Swal.fire({
                    icon: 'error',
                    // title: 'Oops...',
                    text: "Locked file is not draggable😥 Unlock it First!",
                })
            }
        }

    }


    return (
        <div draggable onDragStart={e => hadleDragStart(e, todo.id, action)}>
            <form className="single_todos" onSubmit={e => handleESubmit(e, todo.id, setEdit, editTodo, action)}>
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
                    <span
                        onClick={() =>
                            !todo.isDone ? handleDelete(todo.id, action) : Swal.fire({
                                icon: 'error',
                                // title: 'Oops...',
                                text: "Locked file is not eligible for deletion😥 Unlock it First!",
                            })}
                        className="icon">
                        <AiFillDelete />
                    </span>
                    <span onClick={() => handleDid(todo.id, action)} className="icon">
                        <MdDone />
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SingleTodo;