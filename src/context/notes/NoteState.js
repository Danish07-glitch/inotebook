import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  let host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all notes
  const getAllnotes = async () => {
    // Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),

      },

    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  }
  // Add a note
  const addNote = async (title, description, tag) => {

    // API Call
    const response = await fetch(`${host}/api/notes/postnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),

      },
      body: JSON.stringify({title,description,tag})
    });
    const note =await  response.json();
    console.log(note)
    setNotes(notes.concat(note))

    console.log("adding a new note")


  }

  // Delete a note
  const deleteNote = async (id) => {

    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      // body: JSON.stringify({ })
    });
    const json = response.json();
    console.log(json)


    console.log("note deleted", id)
    let newNote = notes.filter((note) => note._id !== id)
    setNotes(newNote)



  }

  // Update a note
  const editNote = async (id, title, description, tag) => {
    // API Call
   
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),

        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      console.log(json)

      let newNotes = JSON.parse(JSON.stringify(notes))
    
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;

      }
     
    }
    setNotes(newNotes)




  }

  return (
    <NoteContext.Provider value={{ notes, getAllnotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState