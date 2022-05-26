import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function TodoList() {
  const navigate  = useNavigate()
  const isMounted = useRef()

  const [todoList, setTodoList] = useState([])
  const [loader, setLoader]     = useState(true)

  useEffect(() => {
    if(isMounted.current) return
    const token = localStorage.getItem('token') 
    if(!token) navigate('/login')
    
    getTodoList().then(() => {
      setLoader(false)
      isMounted.current = true
    })
  }, [])
  
  function logoutUser(){
    localStorage.removeItem('token')
    navigate('/login')
  }

  async function getTodoList(){
    let responseData = await fetch('http://localhost:4000/todolist',{
      headers:{ 'x-access-token': localStorage.getItem('token')}
    })
    responseData = await responseData.json()
    setTodoList(responseData.todoList)
  }

  return (
    <>
      <header className="bg-white">
        <div className="container py-2 d-flex justify-content-between align-items-center">
          <h1 className="fw-bold fs-4 mt-1">TodoList</h1>
          <button onClick={logoutUser} className="btn btn-outline-secondary">Logout</button>
        </div>
      </header>


      <div className="container">
        <AddTaskForm updateList={getTodoList}/>
      
        <div className="row">
          <div className="col-md-6 mb-5">
            <div className="bg-white card p-3 pt-0 border-0 shadow-sm task-box">
              <h6 className="fw-bold text-secondary mb-3 position-sticky top-0 bg-white  pt-3">Pending Task 
                {!loader && <span className="badge border fw-normal ms-2 p-1 px-2 rounded text-primary">{todoList.length}</span>}
              </h6>
              {
                !loader && todoList.map((item, index) => (
                  <TodoListItem key={index} itemData={item} index={index} isLastItem={todoList.length -1 == index}/>
                ))
              }
            </div>
          </div>

          <div className="col-md-6 mb-5">
            <div className="bg-white card p-3 border-0 shadow-sm task-box">
              <h6 className="fw-bold text-secondary mb-3">Completed Task</h6>
              ----
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}



function AddTaskForm({updateList}){
  
  async function addNewTaskForm(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {}
    for (let entry of formData.entries()) {
        data[entry[0]] = entry[1]
    }

    const responseData = await fetch('http://localhost:4000/todolist', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    })

    if(responseData.status < 300){
      toast.loading('Updating List', {toastId: 'updateList'})
      await updateList()
      document.querySelector('.add-task-form').reset()
      setTimeout(() => toast.dismiss('updateList'), 800)
    }
  }

  return (
    <form className="my-5 bg-white card p-3 border-0 shadow-sm add-task-form" onSubmit={addNewTaskForm}>
      <h6 className="fw-bold text-secondary">Add New Task</h6>
      <div className="d-flex">
        <input type='text' name="task" className="form-control" placeholder="..."/>
        <button className="btn btn-primary ms-4">Add&nbsp;Task</button>
      </div>
    </form>
  )
}



function TodoListItem({itemData, index, isLastItem}){
  return (
    <div className={`animate__animated fadeInUp text-secondary ${!isLastItem ? 'border-bottom border-light py-2' : 'pt-2' }`}>
      <small>{index + 1}.</small> {itemData.task}
    </div>
  )
}