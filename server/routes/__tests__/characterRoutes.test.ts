import {
  expect,
  it,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
  afterEach,
} from 'vitest'
import request from 'supertest'

import connection from '../../db/connection.ts'
import * as db from '../../db/functions/characterDB.ts'
import server from '../../server.ts'

import { Character } from '@models/character.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterEach(async () => {
  vi.restoreAllMocks()
})

afterAll(async () => {
  await connection.destroy()
})

describe('/random?count=', () => {
  it('gets a random character', async () => {
    const count = 1
    const res = await request(server)
      .get('/api/v1/characters/random')
      .query({ count })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          bio: expect.any(String),
          evilPoints: expect.any(Number),
          goodPoints: expect.any(Number),
          imgUrl: expect.any(String),
        }),
      ]),
    )
  })

  it('gets two random characters', async () => {
    const count = 2
    const res = await request(server)
      .get('/api/v1/characters/random')
      .query({ count })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(2)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          bio: expect.any(String),
          evilPoints: expect.any(Number),
          goodPoints: expect.any(Number),
          imgUrl: expect.any(String),
        }),
      ]),
    )
    expect(res.body[0]).not.toStrictEqual(res.body[1])
  })

  it('returns an error when the db fails', async () => {
    vi.spyOn(db, 'getRandomCharacters').mockImplementation(() => {
      throw new Error('random failed')
    })
    vi.spyOn(console, 'error')
    const count = 2
    const res = await request(server)
      .get('/api/v1/characters/random')
      .query({ count })
    expect(res.status).toBe(500)
    expect(res.body.error).toEqual('Something went wrong.')
    expect(db.getRandomCharacters).toHaveBeenCalledWith(count)
    expect(console.error).toHaveBeenCalledWith('random failed')
  })
})

// const getCharById = async (id: number) => { 
//   return await connection('characters').where({id}).first() as Character
// }

describe('PATCH ./characters', () => {
  it('patches a character', async () => {
    const result = await request(server).patch('/api/v1/characters').send({id: 1, evilPoints: 5000, goodPoints: 0, bio: 'Hell Is About To Be Unleashed.'})

    expect(result.statusCode).toBe(200)
    expect(result.body).toMatchInlineSnapshot(`
      {
        "data": {
          "bio": "Hell Is About To Be Unleashed.",
          "evilPoints": 5000,
          "goodPoints": 0,
          "id": 1,
        },
        "result": 1,
      }
    `)

    expect(result.body.data.evilPoints).toStrictEqual(5000)

    // const newChar: Character = await getCharById(1)
    // // const newChar: Character = await connection('characters').where({id: 1}).first()

    // // expect(newChar.evilPoints).toStrictEqual(expect.any(Number))
    // expect(newChar.evilPoints).toStrictEqual(5000)
  })
})