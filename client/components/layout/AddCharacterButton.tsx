import { Button } from '@/components/Button.tsx'
import { useNavigate, useLocation } from 'react-router-dom'

function AddCharacterButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  function handleClick() {
    navigate('/add-character')
  }

  if (pathname === '/add-character') {
    return
  }

  return (
    <>
      <Button type="none" onClick={handleClick}>
        + Add character
      </Button>
    </>
  )
}
export default AddCharacterButton
