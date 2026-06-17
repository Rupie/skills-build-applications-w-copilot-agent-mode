import { Router } from 'express'
import Activity from '../models/activity'

const router = Router()

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean()
  res.json({ activities })
})

router.post('/', async (req, res) => {
  const data = req.body
  const activity = await Activity.create(data)
  res.status(201).json({ activity })
})

export default router
