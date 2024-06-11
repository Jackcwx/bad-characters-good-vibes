import express from 'express'

import * as db from '../db/functions/characterDB'

const router = express.Router()

// GET /api/v1/random
router.get('/random', async (req, res) => {
  try {
    const { count } = req.query
    const characters = await db.getRandomCharacters(Number(count))
    res.json(characters)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('unknown error')
    }
    res.status(500).json({
      error: `Something went wrong.`,
    })
  }
})

// {
//  manager_id: "jniervjn",
//  name: "Gerald",
// bio: 'The weirdest one out there'
// }

router.post('/', async (req, res) => {
  try {
    const data = req.body
    const id = await db.addCharacter(data)
    res.json(id)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('unknown error')
    }
    res.status(500).json({
      error: `Something went wrong.`,
    })
  }
})

export default router
