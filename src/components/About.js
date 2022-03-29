
import React, { useContext,useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'

export const About = () => {
     const a = useContext(noteContext)

     useEffect(() => {
         
        
       
     
       
     }, [])
     
  return (
    <div>
        {/* this is about {a.state.name} and he is {a.state.class} */}
    </div>
  )
}
