import db from '../connection'

import { Manager } from '../../../models/user'

export async function getManager(auth0_id: string): Promise<Manager> {
  return db('managers').select('*').where({ auth0_id }).first()
}

export async function addManager(
  name: string,
  auth0_id: string,
  prestige: number,
): Promise<Manager> {
  return db('managers').insert({
    name,
    auth0_id,
    prestige,
  })
}
