import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';


export default function SignUp() {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)

  // SUBMIT SIGNUP FORM
  const signupFormSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData(e.target)
    const data = {}
    for (let entry of formData.entries()) {
        data[entry[0]] = entry[1]
    }
    
    let response = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(data)
    })
    let responseData = await response.json()

    if(response.status < 300){
      localStorage.setItem('token', responseData.token)
      navigate('/todo-list')
    }else{
      setLoader(false)
      toast.error(responseData.message)
    }
  }

  
  return (
    <>
      <div className="d-flex justify-content-center my-5 py-5">
        <form onSubmit={signupFormSubmit} className="card col-md-6 p-4 shadow-sm border-0 border-top border-light">
          <h2 className="fs-3 fw-bold text-dark mb-4">Sign Up</h2>
          <input name='name' type='text' placeholder='Name' className="form-control" required/>
          <input name='email' type='email' placeholder='Email' className="form-control mt-2" required/>
          <input name='password' type='password' placeholder='Password' className="form-control mt-2" required/>
          
          <div className="d-flex align-items-end">
            <button className="btn btn-primary mt-3">
              {loader ? <span className="px-4"><span className="spinner-grow spinner-grow-sm"></span></span> : 'Sign Up'}
            </button>
            <Link to={'/login'} className="btn btn-link">Login</Link>
          </div>
        </form>
      </div>
    </>
  )
}