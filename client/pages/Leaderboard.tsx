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
      <div className="MostEvil">
        <h1>Most Evil</h1>
        <ul>
          {data.map((character: CharacterData) => (
            <li key={character.fiveEvil.id}>{character.fiveEvil.name}</li>
          ))}
        </ul>
      </div>
      <div className="MostNeutral">
        <h1>Most Neutral</h1>
        <ul>
          {data.map((character: CharacterData) => (
            <li key={character.fiveGood.id}>{character.fiveGood.name}</li>
          ))}
        </ul>
      </div>
      <div className="MostGood">
        <h1>Most Good</h1>
        <ul>
          {data.map((character: CharacterData) => (
            <li key={character.fiveNeutral.id}>{character.fiveNeutral.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Leaderboard
