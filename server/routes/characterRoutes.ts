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

// GET /api/v1/:id
router.get('/:id', async (req,res) => {
  const id = Number(req.params.id)
  try {
    const character = await db.getCharacterById(id)
    res.json(character)
  } catch (error) {
    console.error(`Database error ${error}` )
    res.sendStatus(500)
    
  }
})

export default router
