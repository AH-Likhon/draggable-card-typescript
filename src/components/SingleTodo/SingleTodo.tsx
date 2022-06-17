import { TodoTypes } from "../Todo/Todo";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './SingleTodo.css';

type SingleTodoTypes = {
    todo: TodoTypes;
    todos: TodoTypes[];
    setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: SingleTodoTypes) => {

    const handleDone = (id: number) => {
        setTodos(todos.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t))
    }

    return (
        <form className="single_todos">
            {
                todo.isDone ? <s className="single_todos-text">
                    {todo.todo}
                </s> : <span className="single_todos-text">
                    {todo.todo}
                </span>
            }
            <div>
                <span className="icon">
                    <AiFillEdit />
                </span>
                <span className="icon">
                    <AiFillDelete />
                </span>
                <span onClick={() => handleDone(todo.id)} className="icon">
                    <MdDone />
                </span>
            </div>
        </form>
    );
};

export default SingleTodo;