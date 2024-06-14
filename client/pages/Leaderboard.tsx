import PageTitle from '@/components/PageTitle'
import useFetchLeaderboard from '../hooks/use-fetch-leaderboard'
import { Character } from '../../models/character.ts'
import { Link } from 'react-router-dom'

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
          <h1 className="font-title text-3xl">Most Evil</h1>
          <ul>
            {data.fiveEvil.map((character: Character) => (
              <Link key={character.id} to={`/character/${character.id}`}>
                <li>{character.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h1 className="font-title text-3xl">Most Neutral</h1>
          <ul>
            {data.fiveNeutral.map((character: Character) => (
              <Link key={character.id} to={`/character/${character.id}`}>
                <li>{character.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h1 className="font-title text-3xl">Most Good</h1>
          <ul>
            {data.fiveGood.map((character: Character) => (
              <Link key={character.id} to={`/character/${character.id}`}>
                <li>{character.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Leaderboard
