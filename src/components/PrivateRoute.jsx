import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Navigate } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'

const PrivateRoute = () => {
    const {usering,loading} = useAuthStatus()
    const navigate=useNavigate()
    if (loading) {
        return <div>Loading...</div>;
      }

  return usering!==null? <Outlet /> : navigate('/signin')
}

export default PrivateRoute
