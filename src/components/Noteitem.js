import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/NoteContext'


const Noteitem = (props) => {
  const context = useContext(noteContext)
  const {deleteNote} =context
  const { note,updateNote,showAlert} = props
  return (
      <div className="card my-3  col-md-3">
        <div className="card-body">
          <h5 className="card-title"><b><i>{note.title}</i></b></h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <i className="fa-solid fa-trash-can mx-1" onClick={()=>{deleteNote(note._id) && showAlert("Note Deleted Successfully","success")}}></i>
          <i className="fa-solid fa-pen-to-square mx-1" onClick={()=> updateNote(note)}></i>


        </div>
      </div>
  )
}

export default Noteitem