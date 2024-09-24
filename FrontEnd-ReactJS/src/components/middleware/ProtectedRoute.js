import { Navigate } from 'react-router-dom'
import React from 'react'
export default function ProtectedRoute ({ children }) {
  const token = localStorage.getItem('token')
  //if token not found then redirect to login

  if (!token) {
    return <Navigate to='/login' />
  }
  //if token found then render the child component
  return children
}
