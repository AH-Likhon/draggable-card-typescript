import { useRef } from 'react';
import { addToCart, getCart } from '../LocalStorage/LocalStorage';
import './inputStyles.css';

interface inputTypes {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
    // addToCart: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: inputTypes) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const getData = getCart();



    const handleOnSubmit = (e: React.FormEvent) => {
        handleAdd(e);
        // addToCart(e);
        // console.log(addToCart([...getData, { id: Date.now(), todo: e.target, isDone: false }]));

        inputRef.current?.blur();
    }

    return (
        <form className="input" onSubmit={handleOnSubmit}>
            <input ref={inputRef} type="input" placeholder="Type Something" className="input_box"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            // onChange={(e) => addToCart(e.target.value)}
            />
            <button type="submit" className="input_btn">Add</button>
        </form>
    )
}

export default InputField;