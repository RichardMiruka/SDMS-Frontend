import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className=' flex bg-gray-500 h-screen w-40 p text-white text-center'>
        <div className='space-y-20'>
            <div>Sidebar</div>
            <ul className='flex-frow space-y-6 p-4'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
