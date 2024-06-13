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

// GET /api/v1/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const fiveGood = await db.getTopFiveGoodCharacters()
    const fiveEvil = await db.getTopFiveEvilCharacters()
    const fiveNeutral = await db.getTopFiveneutralCharacters()
    res.json({ fiveGood, fiveEvil, fiveNeutral })
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
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const character = await db.getCharacterById(id)
    res.json(character)
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

router.patch('/', async (req, res) => {
  try {
    const result = await db.patchCharacter(req.body)
    res.json({ data: req.body, result: result }).status(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('unknown error')
    }
    res.status(500).json({
      error: 'Something went wrong.',
    })
  }
})

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
