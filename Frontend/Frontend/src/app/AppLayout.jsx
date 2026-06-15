import React from 'react'
import Nav from './features/Shared/components/Nav'
import { Outlet } from 'react-router'
import CategoryBar from './features/products/components/CategoryBar'


const AppLayout = () => {
    return (
        <>
            <Nav />
            <CategoryBar />
            <Outlet />
        </>
    
    )
}

export default AppLayout