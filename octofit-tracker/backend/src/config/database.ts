import mongoose from 'mongoose'

// Default to octofit_db and allow override via MONGO_URI env var
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

export async function connectDb() {
  return mongoose.connect(MONGO_URI)
}

export default mongoose
