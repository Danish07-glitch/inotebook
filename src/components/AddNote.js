import React, { useContext,useState } from 'react'
import Notes from "./Notes"
import noteContext from '../context/notes/NoteContext'


function AddNote(props) {
    const {showAlert}= props
    const context = useContext(noteContext)
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const {addNote}= context
    
    const handleClick=(e)=>{

        e.preventDefault();   // Page will not be reloaded
        console.log(note.title,note.description,note.tag)
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        showAlert("Note Added SuccessFully","success")


    }
    const onChange=(e)=>{

        setNote({...note,[e.target.name]:e.target.value})


    }
  return (
    <div className='container my-3'>
    <h1>Add a Note</h1>

    <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name='title' className="form-control" id="title" value={note.title} onChange={onChange} aria-describedby="title"/> 
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
          <textarea name="description" id="description"  className="form-control" value={note.description} onChange={onChange} cols="30" rows="10"></textarea>
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input name='tag' type="text" className="form-control" value={note.tag} id="tag" aria-describedby="tag" onChange={onChange}/>
        </div>

        <button disabled={note.title.length<=3 || note.description.length<=5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
    </form>
    

  
  
</div>
  )
}

export default AddNote