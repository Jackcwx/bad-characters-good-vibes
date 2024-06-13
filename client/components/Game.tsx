import { Character } from '@models/character'
import Card from './Card'
import useCharacters from '@/hooks/useCharacters'
// import { getCharacters } from '@/apis/characters'

export default function Game() {
  const character = useCharacters()
  const {
    data: chars,
    isPending,
    isError,
    error,
  } = useCharacters().getCharacters(2)

  if (isPending) {
    return <p>Loading...</p>
  }
  if (isError) {
    return (
      <>
        <p>Error...</p>
        <p>{error.message}</p>
      </>
    )
  }

  function handleClick(char: Character, i: number) {
    if (isPending) {
      return console.log('loading...')
    }
    if (isError) {
      return console.log(error.message)
    }

    const charOne: Character = chars[0]
    const charTwo: Character = chars[1]

    if (i === 0) {
      const newCharOne = { ...charOne, evilPoints: (charOne.evilPoints += 10) }
      character.update(newCharOne)
      const newCharTwo = { ...charTwo, evilPoints: (charTwo.evilPoints -= 5) }
      character.update(newCharTwo)
    } else {
      const newCharOne = { ...charOne, evilPoints: (charOne.evilPoints -= 5) }
      character.update(newCharOne)
      const newCharTwo = { ...charTwo, evilPoints: (charTwo.evilPoints += 10) }
      character.update(newCharTwo)
    }
  }

  // CHANGE HANDLECLICK TO INCREASE SELECTED INDEX AND DECREASE THE OTHERS, NO MATTER HOW MANY CARDS ARE REQUESTED

  return (
    <div className="flex justify-around h-full p-4 my-auto">
      {chars.map((char: Character, i: number) => {
        return (
          <Card key={i} character={char} onClick={() => handleClick(char, i)} />
        )
      })}
    </div>
  )
}
