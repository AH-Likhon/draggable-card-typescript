import { useState } from "react";
import { getCart, getFirstColumn } from "../LocalStorage/LocalStorage";
import SingleTodo from "../SingleTodo/SingleTodo";
import { TodoTypes } from "../Todo/Todo";
import './TodoList.css';

interface TodoProps {
    todos: TodoTypes[];
    setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const TodoList: React.FC<TodoProps> = ({ todos, setTodos }: TodoProps) => {

    const [dragData, setDragData] = useState<TodoTypes[]>([]);
    // const [id, setId] = useState<number>(0);
    const [dragOver, setDragOver] = useState(false);
    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverEnd = () => setDragOver(false);

    const getData = getCart();
    const firstColumnData = getFirstColumn();

    // console.log('GetData', getData);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // setTodos(todos.filter(t => ))
        // let unique = []

        // let geDataS = getData.map((g) => g);

        // for (const item of getData) {
        //     setTodos(todos.filter(t => t.id !== item.id));
        // }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        // e.preventDefault();
        // const find = todos.find(t => t.id === id);
        // console.log(find)
        // const id = todos.map(t => t.id);
        // e.dataTransfer.getData('text');
        // console.log("My id:", e.dataTransfer.getData('text'));
        // console.log(todos);
        // console.log("Lol", dragData);
        // let res1 = todos.filter((obj1: any) => !getData.some((obj2: any) => obj1.id === obj2.id))
        // const res1 = .filter(({ value: id1 }) => !arrayTwo.some(({ value: id2 }) => id2 === id1));
        const data = e.dataTransfer.getData("text/plain");
        setTodos(todos.filter(t => t.id !== JSON.parse(data).id));
        // e.dataTransfer.dropEffect = 'move';
        setDragData([...dragData, JSON.parse(data)]);
        setDragOver(false);
        // console.log(setTodos(todos.filter(t => t.id !== JSON.parse(data).id)));

        // console.log("Over todo:", res1);

    }

    return (
        <div className="container">
            <div className="todos">
                <span className="todos_heading">
                    Active Task
                </span>
                {/* {
                    todos.map(todo => (
                        <SingleTodo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
                    ))
                } */}
                {
                    firstColumnData.map((todo) => (
                        <SingleTodo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
                    ))
                }
            </div>

            <div
                className="todos remove"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragOverStart}
                onDragLeave={handleDragOverEnd}
            >
                <span className="todos_heading">
                    In Progess
                </span>
                {
                    getData.map((todo: any) => (
                        <SingleTodo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
                    ))
                }
            </div>

            <div
                className="todos remove"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragOverStart}
                onDragLeave={handleDragOverEnd}
            >
                <span className="todos_heading">
                    Completed
                </span>
                {/* {
                    todos.map(todo => (
                        <SingleTodo key={todo.id} draggable={true} todo={todo} todos={todos} setTodos={setTodos} />
                    ))
                } */}
            </div>
        </div>
    );
};

export default TodoList;