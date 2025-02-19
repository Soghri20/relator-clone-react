import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Navigate } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {
    const {usering,loading} = useAuthStatus()
    const navigate=useNavigate()
    if (loading) {
        return <Spinner />
      }

  return usering!==null? <Outlet /> : navigate('/signin')
}

export default PrivateRoute
