import React, { useContext } from 'react'
import Notes from "./Notes"
// import showAlert from '../App'


export const Home = (props) => {
    
const {showAlert} = props
    return (
      <div>
          <Notes showAlert={showAlert}/>
      </div>
    )
}
