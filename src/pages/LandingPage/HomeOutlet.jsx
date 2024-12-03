import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeOutlet = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default HomeOutlet