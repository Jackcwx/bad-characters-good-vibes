import { Character } from '@models/character'

interface Props {
  character: Character
}

export default function Card(props: Props) {
  return (
    <div className="h-full w-1/4 rounded-[24px] shadow-md hover:shadow-xl hover:scale-105 duration-150">
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
      <div className="h-1/2 z-20 text-black bg-green rounded-b-[20px] ">
        <p>{props.character.bio}</p>
        <p>{props.character.goodPoints}</p>
        <p>{props.character.evilPoints}</p>
      </div>
    </div>
  )
}
