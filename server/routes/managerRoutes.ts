import express from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/functions/managerDB'
import { Manager } from '@models/user'

const router = express.Router()

export default router

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const manager = await db.getManager(auth0Id as string)

    res.json({ manager })
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.status(500).send('something went wrong!')
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const newManager = req.body
    const auth0id = req.auth?.sub
    const manager: Manager = await db.addManager(
      ...newManager,
      auth0id as string,
      0,
    )

    res.json({ manager })
  } catch (e) {
    console.error(e)
    res.status(500).send('something went wrong!')
  }
})
