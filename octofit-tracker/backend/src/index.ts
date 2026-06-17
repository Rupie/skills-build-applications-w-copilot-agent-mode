import express from 'express'
import { connectDb } from './config/database'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
app.use(express.json())

connectDb()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error', err))

// Health
app.get('/', (_req, res) => res.json({ status: 'ok' }))

// Codespaces-aware config endpoint
app.get('/api/config', (_req, res) => {
  const codespace = process.env.CODESPACE_NAME
  const port = Number(process.env.PORT) || 8000
  let apiUrl: string
  if (codespace) {
    // Codespaces preview URL
    apiUrl = `https://${codespace}-${port}.app.github.dev`
  } else {
    // Localhost fallback
    apiUrl = `http://localhost:${port}`
  }
  res.json({ apiUrl, port })
})

// Mount feature routers
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

const PORT = Number(process.env.PORT) || 8000
app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on port ${PORT}`))
