import { Router } from 'express'
import Team from '../models/team'

const router = Router()

router.get('/', async (_req, res) => {
  const teams = await Team.find().lean()
  res.json({ teams })
})

router.post('/', async (req, res) => {
  const data = req.body
  const team = await Team.create(data)
  res.status(201).json({ team })
})

export default router
