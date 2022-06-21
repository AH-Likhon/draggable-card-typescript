import { useState } from 'react';
import './App.css';
import InputField from './components/InputField/InputField';
import { addToRow } from './components/LocalStorage/LocalStorage';
import { TodoTypes } from './components/Todo/Todo';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoTypes[]>([]);

  // const getData = getFirstColumn();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      addToRow({ id: Date.now(), todo, isDone: false }, "active-task");
      setTodo("");
    }
  }

  // console.log(todos);

  return (
    <div className="App">
      <span className='heading'>Kanban Board</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
