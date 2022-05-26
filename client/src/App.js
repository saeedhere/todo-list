import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './page/Login'
import SignUp from './page/Signup'
import TodoList from './page/TodoList'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to={localStorage.getItem('token') ? '/todo-list' : '/signup'} />}></Route>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/todo-list' element={<TodoList/>}/>
    </Routes>
  )
}