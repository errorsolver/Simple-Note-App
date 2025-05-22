import './App.css'

import Layout from './components/Layout'
import { NoteProvider } from './data/NoteContext'

function App() {
  return (
    <>
      <NoteProvider>
        <Layout />
      </NoteProvider>
    </>
  )
}

export default App
