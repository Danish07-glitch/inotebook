import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login =  () => {
    let history=useNavigate();

    const [credential, setCredential] = useState({email:"",password:""})

    const onChange=(e)=>{

        setCredential({...credential,[e.target.name]:e.target.value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login" ,{
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:credential.email,password:credential.password})

    })

    const json = await response.json()
    console.log(json)
    if (json.success){
        // save the auth token and redirect
        localStorage.setItem('token',json.authtoken)
        history("/")
    }
    else{
        alert("invalid credential")
    }

}
    
    return (
        <div className="container">

            <form  onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} name='email' value={credential.email} className="form-control" id="email" aria-describedby="email" />
                    <div id="emaillabel" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} name='password' value={credential.password} className="form-control" id="password" />
                </div>
        
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    
}

export default Login