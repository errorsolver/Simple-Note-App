import { useContext } from 'react';
import { NoteContext } from '../data/NoteContext';
import './Layout.css';

import './Writeable-Note.css'

const WriteableNote = () => {
    const { title, text, setTitle, setText } = useContext(NoteContext);

    return (
        <div className='note d-flex'>
            <input value={title} className="input-title"
                onChange={e => setTitle(e.target.value)}
                placeholder='Input title here' />
            <textarea value={text} className="textarea-body"
                onChange={e => setText(e.target.value)}
                placeholder='Input text here' />
        </div>
    )
}

export default WriteableNote;