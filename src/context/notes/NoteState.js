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
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzZDcxNGQ2NWE5NDMyYmQ4NjJlOWVlIn0sImlhdCI6MTY0ODI5NzUxNn0.SS5tl0BzDqJjSxHdTHi9T7r61F6dNz_W1DLWMHHFyvI',

    },
    
  });
  const json = await response.json();
  console.log(json)
}
  // Add a note
  const addNote = async (title, desc, tag) => {
  
    // API Call
    const response = await fetch(`${host}/api/notes/postnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzZDcxNGQ2NWE5NDMyYmQ4NjJlOWVlIn0sImlhdCI6MTY0ODI5NzUxNn0.SS5tl0BzDqJjSxHdTHi9T7r61F6dNz_W1DLWMHHFyvI',

      },
      body: JSON.stringify({ title, desc, tag })
    });
    const json = response.json();

    console.log("adding a new note")
    const note =
    {
      "tag": tag,
      "_id": "6240583fe810f2561ce2c975",
      "title": title,
      "description": desc,
      "user": "623d714d65a9432bd862e9ee",
      "date": "2022-03-27T12:27:43.668Z",
      "__v": 0
    }

    setNotes(notes.concat(note))

  }

  // Delete a note
  const deleteNote = (id) => {


    console.log("note deleted", id)
    let newNote = notes.filter((note) => note._id !== id)
    setNotes(newNote)



  }

  // Update a note
  const updateNote = (id, title, description, tag) => {
    // API Call
    async function postData(url = `${host}/api/notes/updatenote/${id}`, data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzZDcxNGQ2NWE5NDMyYmQ4NjJlOWVlIn0sImlhdCI6MTY0ODI5NzUxNn0.SS5tl0BzDqJjSxHdTHi9T7r61F6dNz_W1DLWMHHFyvI',

        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = response.json();
    }
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;


      }

    }



  }

  return (
    <NoteContext.Provider value={{ notes,getAllnotes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState