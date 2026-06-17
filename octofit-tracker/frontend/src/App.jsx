import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

// Note: Define VITE_CODESPACE_NAME in .env.local when running in Codespaces.
// Example: VITE_CODESPACE_NAME=your-codespace-name

export default function App(){
  return (
    <div style={{fontFamily:'sans-serif',padding:20}}>
      <header>
        <h1>OctoFit Tracker</h1>
        <nav style={{display:'flex',gap:12,marginBottom:12}}>
          <Link to="/users">Users</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/workouts">Workouts</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/users" element={<Users/>} />
          <Route path="/teams" element={<Teams/>} />
          <Route path="/activities" element={<Activities/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/workouts" element={<Workouts/>} />
          <Route path="/" element={<div>Select a view above.</div>} />
        </Routes>
      </main>
    </div>
  )
}
