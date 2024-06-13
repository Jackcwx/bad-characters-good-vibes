import request from 'superagent'
import { Manager } from '../../models/user'

const rootUrl = '/api/v1'
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
