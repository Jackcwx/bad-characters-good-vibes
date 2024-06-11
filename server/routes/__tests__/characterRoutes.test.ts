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

describe('character create', () => {
  const data = {
    manageId: 'jniervjn',
    name: 'Gerald',
    bio: 'The weirdest one out there',
  }
  it('returns the new index', async () => {
    const res = await request(server).post('/api/v1/characters').send(data)
    expect(typeof res.body).toStrictEqual('number')
    expect(res.body).toStrictEqual(10)
    expect(res.status).toStrictEqual(200)
  })

  it('returns and error when the db fails', async () => {
    vi.spyOn(db, 'addCharacter').mockImplementation(() => {
      throw new Error('addCharacter failed')
    })
    vi.spyOn(console, 'error')
    const res = await request(server).post('/api/v1/characters').send(data)
    expect(res.status).toBe(500)
    expect(res.body.error).toEqual('Something went wrong.')
    expect(db.addCharacter).toHaveBeenCalledWith(data)
    expect(console.error).toHaveBeenCalledWith('addCharacter failed')
  })
})
