import request from 'superagent'
import { Manager } from '../../models/user'

const rootUrl = '/api/v1'

interface GetManagersFunction {
  token: string
}

export async function getManagers({
  token,
}: GetManagersFunction): Promise<Manager | null> {
  return await request
    .get(`${rootUrl}/managers`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.user ? res.body.user : null))
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
    .post(`${rootUrl}/managers`)
    .set('Authorization', `Bearer ${token}`)
    .send(newManager)
    .then((res) => res.body.manager)
    .catch((error) => console.error(error))
}
