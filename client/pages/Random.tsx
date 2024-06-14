import PageTitle from '@/components/PageTitle'
import useRandomChararcter from '@/hooks/use-random-character'
import { Link } from 'react-router-dom'

function Random() {
  const count = 1
  const { data: character, isError, isPending } = useRandomChararcter(count)
  if (isError) return <p>there was a error</p>
  if (isPending) return <p>Loading...</p>
  const randomCharacter = character[0]
  console.log(randomCharacter)
  return (
    <>
      <PageTitle title="Random" />
      <Link to={`/character/${randomCharacter.id}`}>
        Go to character: {randomCharacter.name}
      </Link>
    </>
  )
}

export default Random
