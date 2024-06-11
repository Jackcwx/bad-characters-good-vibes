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

describe('/id', () => {
  it('returns a character by id', async () => {
    //Arrange
    const id = 3
    //Act
    const res = await request(server).get(`/api/v1/characters/${id}`)
    //Assert
    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        evilPoints: expect.any(Number),
        goodPoints: expect.any(Number),
        imgUrl: expect.any(String),
      }),
    )
    expect(res.body.id).toBe(id)
  })
  it('returns an error when the db fails', async () => {
    vi.spyOn(db, 'getCharacterById').mockImplementation(() => {
      throw new Error('Error getting character')
    })
    vi.spyOn(console, 'error')
    const id = 3
    const res = await request(server).get(`/api/v1/characters/${id}`)
    expect(res.status).toBe(500)
    expect(res.body.error).toEqual('Something went wrong.')
    expect(db.getCharacterById).toHaveBeenCalledWith(id)
    expect(console.error).toHaveBeenCalledWith('Error getting character')
  })
})
