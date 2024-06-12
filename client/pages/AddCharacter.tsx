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
    // if (!user?.sub) {
    //   alert('You must be logged in to add a character')
    //   return
    // }
    const characterDataWithUserId = {
      ...characterData,
      // managerId: user?.sub as string,
    }
    // addCharacter.mutate(characterDataWithUserId)
    addCharacter.mutate({})
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

  function handleImageAdd(event: React.MouseEvent<Element, MouseEvent>) {
    event.preventDefault()
  }

  if (addCharacter.isError) {
    console.log('ERRRRROOORRR: ', addCharacter.error)
  }
  return (
    <>
      <>
        <PageTitle title="Create Character" />
        <div>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <div className="mt-2">
              <input
                type="name"
                name="name"
                placeholder="Example"
                value={characterData.name}
                onChange={handleChange}
                className="px-2 py-1 w-1/2 border border-solid border-white"
              ></input>
            </div>
            <div className="mt-2">
              <label htmlFor="bio" className="block mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={characterData.bio}
                onChange={handleChange}
                className="w-full p-3 h-36 border border-white box-border text-black"
              ></textarea>
            </div>
            <div className="mt-4">
              <Button onClick={handleImageAdd} buttonType="button" type="green">
                <FontAwesomeIcon icon={faUpload} />
              </Button>
            </div>
            <div className="mt-4">
              <Button type="green" data-testid="add-btn" onClick={() => {}}>
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
