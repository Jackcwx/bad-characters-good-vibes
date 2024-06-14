import PageTitle from '@/components/PageTitle'
import useFetchLeaderboard from '../hooks/use-fetch-leaderboard'
import { CharacterData } from '../../models/character.ts'

function Leaderboard() {
  const { data, isLoading, error } = useFetchLeaderboard()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <PageTitle title="Leaderboard" />
      <div className="grid grid-cols-3 gap-4 text-black">
        <div className="bg-white shadow-md rounded p-4">
          <h1>Most Evil</h1>
          <ul>
            {data.fiveEvil.map((character: CharacterData) => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h1>Most Neutral</h1>
          <ul>
            {data.fiveGood.map((character: CharacterData) => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h1>Most Good</h1>
          <ul>
            {data.fiveNeutral.map((character: CharacterData) => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Leaderboard
