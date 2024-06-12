import { Character } from '@models/character'
import { ReactEventHandler } from 'react'

interface Props {
  character: Character
}

export default function Card(props: Props) {

  function handleClick() {
    return console.log(props.character.id) 
  }

  return (
    <button className="h-[40em] w-[25em] rounded-[24px] shadow-md hover:shadow-xl hover:scale-105 duration-75" onClick={handleClick}>
      <div className="relative rounded-t-[20px] h-1/2 w-full overflow-hidden">
        <img
          className="object-cover h-full w-full"
          src={props.character.imgUrl}
          alt={props.character.name}
        />
        <p className="absolute top-0 left-0 text-3xl h-auto w-full z-20 p-4 rounded-t-[20px] bg-gradient-to-b from-black to-none ">
          {props.character.name}
        </p>
      </div>
      <div className="h-1/2 z-20 text-black bg-green rounded-b-[20px] border-box border-4 border-t-0 p-4">
        <p className="text-lg border-b-2 pb-2">Bio:</p>
        <p className="pt-2">{props.character.bio}</p>
        <p>{props.character.goodPoints}</p>
        <p>{props.character.evilPoints}</p>
      </div>
    </button>
  )
}
