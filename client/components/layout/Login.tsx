import { IfAuth, IfNotAuth } from '../Auth'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/Button.tsx'

function Login() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleLogin = () => {
    console.log('logging in')
    return loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/register`,
      },
    })
  }

  const handleLogout = () => {
    console.log('logging out')
    return logout()
  }

  return (
    <>
      <IfAuth>
        {user && <p>Welcome {user?.nickname}</p>}
        <Button type="none" onClick={handleLogout}>
          Log out
        </Button>
      </IfAuth>
      <IfNotAuth>
        <Button type="none" onClick={handleLogin}>
          Log in
        </Button>
      </IfNotAuth>
    </>
  )
}

export default Login
