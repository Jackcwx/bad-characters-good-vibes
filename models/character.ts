export interface CharacterData {
  managerId: number
  name: string
  bio: string
  evilPoints: number
  goodPoints: number
  imgUrl: string
}

export interface Character extends CharacterData {
  id: number
}
