import SingleTodo from "../SingleTodo/SingleTodo";
import { TodoTypes } from "../Todo/Todo";
import './TodoList.css';

interface TodoProps {
    todos: TodoTypes[];
    setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const TodoList: React.FC<TodoProps> = ({ todos, setTodos }: TodoProps) => {
    return (
        <div className='todos'>
            {
                todos.map(todo => (
                    <SingleTodo todo={todo} todos={todos} setTodos={setTodos} />
                ))
            }
        </div>
    );
};

export default TodoList;