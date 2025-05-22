import { useContext } from "react";

import ReadonlyNote from "./Readonly-Note";
import { NoteContext } from "../data/NoteContext";

import './Sidebar.css';

const Sidebar = () => {
    const { notes, deleteNote, selectNote } = useContext(NoteContext);

    return (
        <div className="scroll-v">
            <div>
                {notes.map(note => (
                    <ReadonlyNote
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        content={note.text}
                        onDelete={deleteNote}
                        onSelect={() => selectNote(note)} note={() => note}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;