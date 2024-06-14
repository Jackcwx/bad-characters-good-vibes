import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'

function ManagerPageButton() {
  const navigate = useNavigate()
  const { user } = useAuth0()

  if (!user) return <></>

  const handleClick = () => {
    navigate(`/managers/${user?.sub}`)
  }

  return (
    <>
      <Button type="none" onClick={handleClick}>
        My Characters
      </Button>
    </>
  )
}

export default ManagerPageButton
