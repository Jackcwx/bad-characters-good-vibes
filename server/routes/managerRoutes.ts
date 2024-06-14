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

    res.json({ manager }).status(200)
  } catch (e) {
    console.error(e)
    res.status(500).send('something went wrong!')
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { name } = req.body as { name: string }
    const auth0id = req.auth?.sub
    const manager: Manager = await db.addManager(name, auth0id as string, 0)

    res.json({ manager }).status(200)
  } catch (e) {
    console.error(e)
    res.status(500).send('something went wrong!')
  }
})

router.get('/:managerId/characters', checkJwt, async (req, res) => {
  try {
    const managerId = String(req.params.managerId)
    const characters = await db.getCharactersByManagerId(managerId)
    res.json({ characters }).status(200)
  } catch (e) {
    console.error(e)
    res.status(500).send('something went wrong!')
  }
})
