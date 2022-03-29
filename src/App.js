
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
}
 from "react-router-dom";
import { Home } from './components/Home';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert'
import AddNote from './components/AddNote';


function App() {
  return (
    <>

    <NoteState>
    <BrowserRouter>
    <div>
    <Navbar/>
    <Alert message="this is amazing"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  </BrowserRouter>

  </NoteState>

  </>
  );
}

export default App;
