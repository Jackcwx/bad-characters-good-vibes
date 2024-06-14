import { IfAuth } from '@/components/Auth'
import PageTitle from '@/components/PageTitle'
import AddCharacterButton from '@/components/layout/AddCharacterButton'
import { useManagersCharacters } from '@/hooks/manager'
import { Link, useParams } from 'react-router-dom'

function Manager() {
  const managerId = useParams().managerId
  const {
    data: characters,
    isPending,
    isError,
  } = useManagersCharacters(managerId as string)

  if (isPending) return <p>...loading</p>

  if (isError) return <p>Something went Wrong!</p>

  return (
    <>
      <PageTitle title="Manager" />

      <div>
        <ul>
          {characters.map((char) => (
            <Link key={char.id} to={`/character/${char.id}`}>
              <li className="text-2xl">{char.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <IfAuth>
        <div className="mt-10">
          <AddCharacterButton />
        </div>
      </IfAuth>
    </>
  )
}

export default Manager
