import { useRef } from 'react';
import './inputStyles.css';

interface inputTypes {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void
}

const InputField = ({ todo, setTodo, handleAdd }: inputTypes) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnSubmit = (e: React.FormEvent) => {
        handleAdd(e);
        inputRef.current?.blur();
    }

    return (
        <form className="input" onSubmit={handleOnSubmit}>
            <input ref={inputRef} type="input" placeholder="Type Something" className="input_box"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="input_btn">Add</button>
        </form>
    )
}

export default InputField;