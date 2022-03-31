
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
import Login from './components/Login';
import Signup from './components/Signup';


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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  </BrowserRouter>

  </NoteState>

  </>
  );
}

export default App;
