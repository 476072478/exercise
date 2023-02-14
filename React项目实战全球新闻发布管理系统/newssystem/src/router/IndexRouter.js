import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NProgress from 'nprogress'
import Login from '../views/login/Login'
import NewsSandBox from '../views/newsSandBox/NewsSandBox'
export default function IndexRouter() {
    NProgress.start()
    const location = useLocation()
    useEffect(() => {
        NProgress.done()
    }, [location.pathname])
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={
                localStorage.getItem('token') ?
                    <NewsSandBox ></NewsSandBox > :
                    <Navigate to='/login' />
            }
            />
        </Routes>

    )
}
