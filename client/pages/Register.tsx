import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'
import { useManagers } from '@/hooks/manager'
import { IfAuth, IfNotAuth } from '@/components/Auth'
import { Button } from '@/components/Button'

function Register() {
  const [errMsg, setErrMsg] = useState('')
  const { getAccessTokenSilently } = useAuth0()
  const managers = useManagers()

  const handleMutationSuccess = () => {
    setErrMsg('')
  }

  const handleErr = (e: unknown) => {
    if (e instanceof Error) setErrMsg(e.message)
    else setErrMsg('unknown error')
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
    onError: handleErr,
  }

  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '' })

  useEffect(() => {
    if (managers.data) {
      console.log('working')
      navigate('/')
    }
  }, [managers.data, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.MouseEvent<Element, MouseEvent>) => {
    const token = await getAccessTokenSilently()
    const name = form.name
    e.preventDefault()
    managers.add.mutate(
      { newManager: { name, auth0_id: token, prestige: 0 }, token },
      mutationOptions,
    )
    navigate('/')
  }

  const hideError = () => {
    setErrMsg('')
  }

  return (
    <div>
      <div>
        <IfAuth>
          <h1>Enter your details</h1>
          {errMsg && (
            <div>
              Error: {errMsg}
              <Button type="none" onClick={hideError}>
                Okay
              </Button>
            </div>
          )}
          <form>
            <div>
              <label htmlFor="manager">New Manager</label>
              <input
                type="text"
                id="manager"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Button type="none" onClick={handleSubmit}>
                Register
              </Button>
            </div>
          </form>
        </IfAuth>
        <IfNotAuth>
          <h1>Please sign in</h1>
        </IfNotAuth>
      </div>
    </div>
  )
}

export default Register
