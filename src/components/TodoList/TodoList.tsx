import { useState } from "react";
import { getSecondColumn, getFirstColumn, saveToRow, addToRow, getThirdColumn } from "../LocalStorage/LocalStorage";
import SingleTodo from "../SingleTodo/SingleTodo";
import { TodoTypes } from "../Todo/Todo";
import './TodoList.css';

interface TodoProps {
    todos: TodoTypes[];
    setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const TodoList: React.FC<TodoProps> = ({ todos, setTodos }: TodoProps) => {

    const [dragOver, setDragOver] = useState(false);
    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverEnd = () => setDragOver(false);

    const firstColumnData = getFirstColumn();
    const secondColumnData = getSecondColumn();
    const thirdColumnData = getThirdColumn();

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        console.log(typeof data)
        console.log(data)

        if (data && data.action === "active-task") {
            let item: TodoTypes = { id: data.id, todo: data.todo, isDone: data.isDone };
            const restItems = firstColumnData.filter(t => t.id !== item.id);
            saveToRow(restItems, data.action);
            addToRow(item, "in-progress");
            setDragOver(false);
        };

        if (data && data.action === "in-progress") {
            let item: TodoTypes = { id: data.id, todo: data.todo, isDone: data.isDone };
            const restItems = secondColumnData.filter(t => t.id !== item.id);
            saveToRow(restItems, data.action);
            addToRow(item, "completed");
            setDragOver(false);
        };
        // e.dataTransfer.dropEffect = 'move';
    }

    return (
        <div className="container">
            <div className="todos">
                <span className="todos_heading">
                    Active Task
                </span>
                {
                    firstColumnData.map((todo) => (
                        <SingleTodo action="active-task" key={todo.id} todo={todo} />
                    ))
                }
            </div>

            <div
                className="todos second"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragOverStart}
                onDragLeave={handleDragOverEnd}
            >
                <span className="todos_heading">
                    In Progess
                </span>
                {
                    secondColumnData.map((todo) => (
                        <SingleTodo action="in-progress" key={todo.id} todo={todo} />
                    ))
                }
            </div>

            <div
                className="todos third"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragOverStart}
                onDragLeave={handleDragOverEnd}
            >
                <span className="todos_heading">
                    Completed
                </span>

                {
                    thirdColumnData.map((todo) => (
                        <SingleTodo action="completed" key={todo.id} todo={todo} />
                    ))
                }
            </div>
        </div>
    );
};

export default TodoList;