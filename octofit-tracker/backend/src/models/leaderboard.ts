import { Schema, model, Document, Types } from 'mongoose'

export interface ILeaderboard extends Document {
  user: Types.ObjectId
  score: number
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, default: 0 }
})

export default model<ILeaderboard>('Leaderboard', LeaderboardSchema)
