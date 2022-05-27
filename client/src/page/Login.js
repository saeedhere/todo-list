import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)

  // SUBMIT LOGIN FORM
  const loginFormSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData(e.target)
    const data = {}
    for (let entry of formData.entries()) {
        data[entry[0]] = entry[1]
    }
    
    let response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(data)
    })
    let responseData = await response.json()

    if(response.status < 300){
      localStorage.setItem('token', responseData.token)
      navigate('/todo-list')
    }else{
      toast.error(responseData.message)
      setLoader(false)
    }
  }

  
  return (
    <>
      <div className="d-flex justify-content-center my-5 py-5">
        <form onSubmit={loginFormSubmit} className="card col-md-6 p-4 shadow-sm border-0 border-top border-light">
          <h2 className="fs-3 fw-bold text-dark mb-4">Login</h2>
          <input name='email' type='email' placeholder='Email' className="form-control" required/>
          <input name='password' type='password' placeholder='Password' className="form-control mt-2" required/>
          
          <div className="d-flex align-items-end">
            <button className="btn btn-primary mt-3">
              {loader ? <span className="px-3"><span className="spinner-grow spinner-grow-sm"></span></span> : 'Login'}
            </button>
            <Link to={'/signup'} className="btn btn-link">Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  )
}