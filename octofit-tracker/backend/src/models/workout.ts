import { Schema, model, Document } from 'mongoose'

export interface IWorkout extends Document {
  name: string
  duration_min: number
  difficulty?: string
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  duration_min: { type: Number, required: true },
  difficulty: { type: String }
})

export default model<IWorkout>('Workout', WorkoutSchema)
