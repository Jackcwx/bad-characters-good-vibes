import PageTitle from '@/components/PageTitle'
import { useCharacterById } from '@/hooks/use-character-by-id'
import { useParams } from 'react-router-dom'

function CharacterById() {
  // get id from useParams
  const { id } = useParams()
  // call our custom hook with the id
  const { data: character, isPending, isError } = useCharacterById(id)
  if (isPending) return <p>Loading..</p>
  if (isError) return <p>There was a error</p>
  console.log(character)

  return (
    <>
      <PageTitle title="Character" />
      <h2>{character.name}</h2>
      <p>ID: {character.id}</p>
      <p>Manager ID: {character.managerId}</p>
      <p>Bio: {character.bio}</p>
      <p>Evil Points: {character.evilPoints}</p>
      <p>Good Points: {character.goodPoints}</p>
      <p>
        <img src={character.imgUrl} alt={character.name} />
      </p>
    </>
  )
}

export default CharacterById
