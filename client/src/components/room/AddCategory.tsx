import { useState } from 'react';
import { socket } from "../../socket";

type AddCategoryProps = {
    roomId: string,
    roomCategories: string[],
    setRoomCategories: React.Dispatch<React.SetStateAction<string[]>>
}

export const AddCategory = ({roomId, roomCategories, setRoomCategories}: AddCategoryProps) => {
    const [category, setCategory] = useState('');

    const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    }

    const addCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRoomCategories([...roomCategories, category]);
        socket.emit('add-category', roomId, category);
        document.getElementById('start-game-button')?.classList.remove('disabled');
        document.getElementById('add-category-button')?.classList.add('disabled');
    }

  return (
    <>
        <form onSubmit={addCategory}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter a category" name="category" value={category} onChange={categoryHandler} required></input>
            </div>
            <p className='mb-0'>
                <button id="add-category-button" className="btn btn-outline-dark my-2" type='submit'>Add category</button>
            </p>
        </form>

    </>
  )
}
