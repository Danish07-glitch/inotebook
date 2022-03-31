import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'

const Notes = () => {

  const context = useContext(noteContext)
  const { notes, getAllnotes,editNote} = context
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

  useEffect(() => {

    getAllnotes();

  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.etag})



  }
  const ref = useRef(null)
  const refClose = useRef(null)

  const handleClick=(e)=>{

   console.log("Updating")
   editNote(note.id,note.etitle,note.edescription,note.etag)
   refClose.current.click()


   
   

}
const onChange=(e)=>{

    setNote({...note,[e.target.name]:e.target.value})


}

  return (
    <>
      <AddNote />

      <button style={{ "visibility": "hidden" }} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
         
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update your Note</h5>

            </div>
            <div className="modal-body">
            <form>
            <div className="mb-3">
              <label htmlFor="etitle" className="form-label">Title</label>
              <input value={note.etitle} type="text" name='etitle' className="form-control" id="etitle" onChange={onChange} aria-describedby="etitle" />
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">Description</label>
              <input value={note.edescription} type="text" name='edescription' className="form-control" id="edescription" onChange={onChange} aria-describedby="edescription" />            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">Tag</label>
              <input value={note.etag} name='etag' type="text" className="form-control" id="etag" aria-describedby="etag" onChange={onChange} />
            </div>
          </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<=3 || note.edescription.length<=5} type="button" className="btn btn-primary" onClick={handleClick}>Upadate changes</button>
              
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h1 className='my-3'>Your Notes</h1>
        {notes.map((note) => {

          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} />
          )

        })}
      </div>
    </>
  )
}


export default Notes