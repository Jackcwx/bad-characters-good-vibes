import { useCharacterById } from '@/hooks/use-character-by-id'
import { useParams } from 'react-router-dom'

function CharacterById() {
  // get id from useParams
  const { id } = useParams()
  // call our custom hook with the id
  const { data: character, isPending, isError } = useCharacterById(Number(id))
  if (isError) return <p>There was a error</p>
  if (isPending) return <p>Loading..</p>

  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl mt-50 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                src={character.imgUrl}
                alt={character.imgUrl}
                className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>

          <div className="w-full text-center mt-20">
            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
              <div className="p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                  {character.evilPoints}
                </span>
                <span className="text-sm text-slate-400">Evil Points</span>
              </div>
              <div className="p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                  {character.id}
                </span>
                <span className="text-sm text-slate-400">ID</span>
              </div>
              <div className="p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                  {character.goodPoints}
                </span>
                <span className="text-sm text-slate-400">Good Points</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
            {character.name}
          </h3>
          <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75">
              Managers ID:
            </i>
            {character.managerId}
          </div>
        </div>
        <div className="mt-6 py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <p className="font-light leading-relaxed text-slate-600 mb-4">
                {character.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CharacterById
