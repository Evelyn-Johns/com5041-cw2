import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

import Feed from "./pages/Feed"

export default function App() {
    return (
        <div className="bg-base-100 min-h-screen">
            <Feed />
        </div>
    )
}