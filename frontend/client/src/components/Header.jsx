import React from 'react'
import '../App.css'

export default function Header() {
  return (
    <div className='header'>
        <div className="logo">
            The Logo
        </div>

        <nav>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <button className='btn'>Login</button>
            </ul>
        </nav>
    </div>
  )
}
