import { Character } from '@models/character'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons'

interface Props {
  key: number
  character: Character
  onClick: () => void
}

export default function Card(props: Props) {
  return (
    <button
      className={`h-[40em] w-[25em] rounded-[24px] shadow-md hover:shadow-xl my-auto hover:animate-wiggle`}
      onClick={props.onClick}
    >
      <div className="relative rounded-t-[20px] h-2/3 w-full overflow-hidden">
        <img
          className="object-cover h-full w-full"
          src={props.character.imgUrl}
          alt={props.character.name}
        />
        <p className="absolute top-0 left-0 text-3xl h-auto w-full z-20 p-4 rounded-t-[20px] bg-gradient-to-b from-black to-none ">
          {props.character.name}
        </p>
      </div>
      <div className="relative h-1/3 z-20 text-black bg-slate-200 rounded-b-[20px] border-box border-4 border-t-0 p-4 font-light text-lg border-box">
        <p className="pt-2">{props.character.bio}</p>
        <div className="absolute bottom-0 left-0 flex justify-between w-full p-4 text-2xl">
          <p className="text-green font-semibold">
            {props.character.goodPoints}
          </p>
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="mr-1 hover:scale-125 duration-75"
            style={{ color: '#e66533' }}
          />
          <p className="text-red font-semibold">{props.character.evilPoints}</p>
        </div>
      </div>
    </button>
  )
}
