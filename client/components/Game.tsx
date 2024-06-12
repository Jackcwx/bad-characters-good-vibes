import { Character } from '@models/character'
import Card from './Card'

export default function Game() {
  const characterOne: Character = {
    id: 1,
    managerId: 2,
    name: 'Sam',
    bio: 'qwuyc iyweqgd oqdiug 1weq',
    evilPoints: 32179,
    goodPoints: 1289,
    imgUrl:
      'https://cdn.openart.ai/published/nTF9iBlw1E2ZdjDlRlvy/gE1OPduW_Dk6C_512.webp',
  }
  const characterTwo: Character = {
    id: 2,
    managerId: 4,
    name: 'Dracula',
    bio: 'wqdpiuh qwerffi qweyg   qoiweudg ',
    evilPoints: 352,
    goodPoints: 23187,
    imgUrl:
      'https://img.freepik.com/premium-photo/medieval-knight-armor-stands-with-hamburger-his-hands-against-background-castle_217593-30973.jpg',
  }

  return (
    <div className="flex justify-around h-[90%] align-middle bg-blue p-4">
      <Card character={characterOne} />
      <Card character={characterTwo} />
    </div>
  )
}
