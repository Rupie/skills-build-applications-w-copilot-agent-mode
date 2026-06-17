/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Leaderboard from '../models/leaderboard'
import Workout from '../models/workout'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

async function seed(){
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO_URI)

  // Clear collections
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ])

  // Users
  const users = await User.create([
    { name: 'Alice Runner', email: 'alice@example.com' },
    { name: 'Bob Cyclist', email: 'bob@example.com' },
    { name: 'Cara Swimmer', email: 'cara@example.com' }
  ])

  // Teams
  const teams = await Team.create([
    { name: 'Morning Crew', members: [users[0]._id, users[1]._id] },
    { name: 'Weekend Warriors', members: [users[2]._id] }
  ])

  // Workouts
  const workouts = await Workout.create([
    { name: 'Quick HIIT', duration_min: 20, difficulty: 'medium' },
    { name: 'Endurance Ride', duration_min: 60, difficulty: 'hard' }
  ])

  // Activities
  const activities = await Activity.create([
    { user: users[0]._id, type: 'run', distance_km: 5, duration_min: 28 },
    { user: users[1]._id, type: 'ride', distance_km: 25, duration_min: 75 },
    { user: users[2]._id, type: 'swim', duration_km: 1.2, duration_min: 40 } as any
  ])

  // Leaderboard
  await Leaderboard.create([
    { user: users[0]._id, score: 150 },
    { user: users[1]._id, score: 120 },
    { user: users[2]._id, score: 90 }
  ])

  console.log('Seeding complete')
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('Seed error', err)
  process.exit(1)
})
