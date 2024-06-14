import { IfAuth, IfNotAuth } from '@/components/Auth'
import PageTitle from '@/components/PageTitle'
import { useManagersCharacters } from '@/hooks/manager'
import { useParams } from 'react-router-dom'

function Manager() {
  const managerId = useParams().managerId
  const {
    data: characters,
    isPending,
    isError,
  } = useManagersCharacters(managerId as string)

  if (isPending) return <p>...loading</p>

  if (isError) return <p>Something went Wrong!</p>

  console.log(characters)

  return (
    <>
      <PageTitle title="Manager" />
      <IfAuth>
        <div>
          <ul>
            {characters.map((char) => (
              <li key={char.id}>{char.name}</li>
            ))}
          </ul>
        </div>
      </IfAuth>
      <IfNotAuth>
        <p>Please sign in</p>
      </IfNotAuth>
    </>
  )
}

export default Manager
