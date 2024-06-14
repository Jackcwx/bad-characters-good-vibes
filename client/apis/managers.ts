import request from 'superagent'
import { Manager } from '../../models/user'
import { Character } from '@models/character'

const baseUrl = new URL('/api/v1/managers', document.baseURI)

interface GetManagersFunction {
  token: string
}

export async function getManagers({
  token,
}: GetManagersFunction): Promise<Manager | null> {
  return await request
    .get(`${baseUrl}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.manager ? res.body.manager : null))
    .catch((error) => console.error(error))
}

interface AddManagerFunction {
  newManager: Manager
  token: string
}

export async function addManagers({
  newManager,
  token,
}: AddManagerFunction): Promise<Manager> {
  return request
    .post(`${baseUrl}`)
    .set('Authorization', `Bearer ${token}`)
    .send(newManager)
    .then((res) => res.body.manager)
    .catch((error) => console.error(error))
}

export async function getCharactersByManagerId({
  token,
  managerId,
}: {
  token: string
  managerId: string
}): Promise<Character[]> {
  return request
    .get(`${baseUrl}/${managerId}/characters`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      const response = res.body.characters ? res.body.characters : null
      return response as Character[]
    })
    .catch((error) => {
      console.error(error)
      throw Error('unauthroized')
    })
}
