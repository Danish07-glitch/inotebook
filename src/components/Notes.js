import React,{useContext,useEffect} from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'

const Notes = () => {

    const context = useContext(noteContext)
    const {notes,getAllnotes}= context
   
    useEffect(() => {
      
      getAllnotes();
    
    }, [])
    
  return (
    <>
    <AddNote/>
    <div className="row">
        <h1 className='my-3'>Your Notes</h1>        
        {notes.map((note) =>{
    
            return (
                   <Noteitem key={note._id} note ={note}/>
                )
    
        })}
    </div>
    </>
  )
}


export default Notes