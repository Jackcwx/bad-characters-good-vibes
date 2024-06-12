import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const useIsAuth = () => {
  const { isAuthenticated } = useAuth0()

  return isAuthenticated
}

interface Props {
  children: React.ReactNode
}

export function IfAuth(props: Props) {
  const { children } = props
  return useIsAuth() ? <>{children}</> : null
}

export function IfNotAuth(props: Props) {
  const { children } = props
  return !useIsAuth() ? <>{children}</> : null
}
