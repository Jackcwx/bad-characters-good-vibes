export interface CharacterData {
  managerId: string
  name: string
  bio: string
  evilPoints: number
  goodPoints: number
  imgUrl: string
}

export interface Character extends CharacterData {
  id: number
}
