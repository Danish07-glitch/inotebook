import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()

    const [credential, setCredential] = useState({name:"",email:"",password:"",confirmpassword:""})
    const onSubmit= async (e)=>{

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
        })
        const json=await response.json()
        console.log(json)
        if (json.success){

            localStorage.setItem('token',json.authtoken)
            navigate("/")
        }
        else{
            alert("invalid credential")
        }
    


        

    }
    const onChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
  return (
      <div className="container">

    <form onSubmit={onSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" name="name" className="form-control" value={credential.name}  onChange={onChange} id="name" aria-describedby="name"/>
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name="email" className="form-control" value={credential.email} onChange={onChange} id="email" aria-describedby="email"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name="password" value={credential.password} className="form-control" onChange={onChange} id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
    <input type="password" name="confirmpassword" value={credential.confirmpassword} className="form-control" onChange={onChange} id="confirmpassword"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
  )
}

export default Signup