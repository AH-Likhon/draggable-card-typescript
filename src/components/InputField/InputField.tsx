import React, { useRef } from 'react';
import './inputStyles.css';

interface inputTypes {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    remaining: number;
    setRemaining: React.Dispatch<React.SetStateAction<number>>;
}

const InputField = ({ todo, setTodo, handleAdd, total, setTotal, remaining, setRemaining }: inputTypes) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnSubmit = (e: React.FormEvent) => {
        handleAdd(e);

        inputRef.current?.blur();
    }

    const handleOnkey = () => {
        let charVal = todo.length;
        setTotal(charVal);
        // console.log(charVal);
        setRemaining(50 - charVal);
    }

    return (
        <>
            <form className="input" onSubmit={handleOnSubmit}>
                <input
                    ref={inputRef}
                    type="input"
                    maxLength={50}
                    placeholder="Type Something"
                    className="input_box"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onKeyUp={handleOnkey}
                />
                <button type="submit" className="input_btn">Add</button>
            </form>

            <div className="counter">
                <p>Total Char:
                    <span className="total_counter"> {total}</span>
                </p>
                <p>Remaining Char:
                    <span className="remaining_counter"> {remaining}</span>
                </p>
            </div>
        </>
    )
}

export default InputField;