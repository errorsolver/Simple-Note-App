import { createContext, useEffect, useRef, useState } from "react";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    const isInitialLoad = useRef(true);
    const [notes, setNotes] = useState([
        { id: 1, title: "Welcome to Simple Notes", text: `Here you can save all the notes and they will be saved on your device.` },
        {
            id: 2, title: "Tutorial", text: `🗂️ Select Saved Notes
On the left, you can see a list of notes that you have previously saved. Just click to open it~

➕ Add New Note
Want to create a new note? Click the “+ Add Note” button on the top left, right above your note list~ Let's write something new!

📝 Edit Note Title and Content
The large middle section is where you pour out your heart~
-----------------------------------
Above, type the title of your note.
Below, write all the contents of your note~ Free and unlimited!` }]);

    const [title, setTitle] = useState(notes[0].title);
    const [text, setText] = useState(notes[0].text);
    const [selectedNoteId, setSelectedNoteId] = useState(notes[0].id);
    console.log('cek id: ', notes[0].id)

    useEffect(function LoadNotes() {
        if (isInitialLoad.current) {
            const savedNotes = localStorage.getItem("myNotes");
            if (savedNotes) {
                const parsedNotes = JSON.parse(savedNotes)
                const isDifferent = JSON.stringify(parsedNotes) !== JSON.stringify(notes);
                if (isDifferent) {
                    console.log('savedNotes');
                    setNotes(parsedNotes);
                }
            }
            isInitialLoad.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(function SaveNotesChange() {
        console.log('setNotes useEffect');
        localStorage.setItem("myNotes", JSON.stringify(notes));
    }, [notes]);

    useEffect(function saveEveryChangeOnSelected() {
        const refreshTime = 500;
        console.log('selectedNoteId:', selectedNoteId);

        const timeout = setTimeout(() => {
            if (selectedNoteId) {
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === selectedNoteId ? { ...note, title, text } : note

                    )
                );
            }
        }, refreshTime)

        return () => clearTimeout(timeout);
    }, [title, text, selectedNoteId]);

    const handleNewNote = () => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === selectedNoteId ? { ...note, title, text } : note
            )
        );

        const newNote = {
            id: Date.now(),
            title: '',
            text: '',
        };

        setNotes([...notes, newNote]);
        setSelectedNoteId(newNote.id);
        setTitle("");
        setText("");
    };

    const selectNote = (note) => {
        setSelectedNoteId(note.id);
        setTitle(note.title);
        setText(note.text);
    };

    const deleteNote = (id, event) => {
        event.stopPropagation();
        setNotes(notes.filter(note => note.id !== id));
    };

    const saveNote = (note) => {
        setNotes([...notes, note]);
    };

    return (
        <NoteContext.Provider value={{ notes, title, text, setTitle, setText, deleteNote, saveNote, handleNewNote, selectNote }}>
            {children}
        </NoteContext.Provider>
    );
};

export { NoteContext, NoteProvider };