import { Button } from '@/components/Button'
import PageTitle from '@/components/PageTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-router-dom'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import useAddCharacter from '@/hooks/use-add-character'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function AddCharacter() {
  const addCharacter = useAddCharacter()
  const { user } = useAuth0()

  const [characterData, setCharacterData] = useState({
    managerId: '',
    name: '',
    bio: '',
    evilPoints: 0,
    goodPoints: 0,
    imgUrl: '',
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCharacterData({
      ...characterData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const characterDataWithUserId = {
      ...characterData,
      managerId: user.sub as string,
    }
    addCharacter.mutate(characterDataWithUserId)
  }

  const handleClear = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault()
    setCharacterData({
      managerId: '',
      name: '',
      bio: '',
      evilPoints: 0,
      goodPoints: 0,
      imgUrl: '',
    })
  }

  return (
    <>
      <>
        <PageTitle title="Create Character" />
        <div>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <div style={{ marginTop: '5px' }}>
              <input
                type="name"
                name="name"
                placeholder="Example"
                value={characterData.name}
                onChange={handleChange}
                style={{
                  padding: '5px',
                  width: '50%',
                  border: '1px solid white',
                }}
              ></input>
            </div>
            <div style={{ marginTop: '5px' }}>
              <label
                htmlFor="bio"
                style={{ display: 'block', marginBottom: '5px' }}
              >
                Bio
              </label>
              <textarea
                name="bio"
                value={characterData.bio}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '5px',
                  height: '150px',
                  border: '1px solid white',
                  boxSizing: 'border-box',
                  color: 'black',
                }}
              ></textarea>
            </div>
            <div style={{ marginTop: '10px' }}>
              <Button buttonType="button" type="green">
                <FontAwesomeIcon icon={faUpload} />
              </Button>
            </div>
            <div style={{ marginTop: '15px' }}>
              <Button type="green" onClick={() => {}}>
                Add
              </Button>
              <Button buttonType="button" type="green" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </Form>
        </div>
      </>
    </>
  )
}

export default AddCharacter
