import { useContext } from 'react';

import Sidebar from './Sidebar';
import WriteableNote from './Writeable-Note';
import { NoteContext } from '../data/NoteContext';

import './Layout.css';

const Layout = () => {
    const { handleNewNote } = useContext(NoteContext);

    return (
        <div className="layout">
            <header>
                <h1 className='tooltip'>Simple Note App
                    <span className='tooltiptext'>
                        <p>Github: @errorsolver <br />
                        Create with React <br />
                        Create at: May 2025 <br />
                        Ver 1.0.1</p>
                    </span>
                </h1>
            </header>

            <div className='main-content'>
                <aside>
                    <button onClick={handleNewNote}>+ New Note</button>
                    <Sidebar />
                </aside>
                <main>
                    <WriteableNote />
                </main>
            </div>

            <footer>
                <p>@errorsolver</p>
                <p>&copy; 2025 Simple Note App</p>
            </footer>
        </div>
    );
}

export default Layout;