import { Button } from '@/components/Button'
import PageTitle from '@/components/PageTitle'
import { Form } from 'react-router-dom'
import useAddCharacter from '@/hooks/use-add-character'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
// Cloudinary
import { Cloudinary } from '@cloudinary/url-gen'
import UploadWidget from '../components/UploadWidget'
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'

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

  // CLOUDINARY
  const [imageInfo, setImageInfo] = useState({ publicId: '', secure_url: '' })
  const [cloudName] = useState('dun8vp0gv')
  const [uploadPreset] = useState('nd6wu8gg')
  const cld = new Cloudinary({ cloud: { cloudName: 'dun8vp0gv' } })

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  })

  const myImage = cld.image(imageInfo.publicId)
  myImage.resize(fill().width(300).height(300))

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCharacterData({
      ...characterData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault()
    if (!user?.sub) {
      alert('You must be logged in to add a character')
      return
    }
    const characterDataWithUserId = {
      ...characterData,
      managerId: user?.sub as string,
      imgUrl: imageInfo.secure_url,
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
      {user ? (
        <>
          <PageTitle title="Create Character" />
          <div>
            <Form>
              <label htmlFor="name">Name</label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  placeholder="Example"
                  value={characterData.name}
                  onChange={handleChange}
                  className="px-2 py-1 w-1/2 border border-solid border-white"
                ></input>
              </div>
              <div className="mt-2">
                <label htmlFor="bio" className="block">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={characterData.bio}
                  onChange={handleChange}
                  className="w-full p-3 h-36 mt-2 border border-white box-border text-black"
                ></textarea>
              </div>
              <div className="mt-2">
                <UploadWidget uwConfig={uwConfig} setImageInfo={setImageInfo} />

                <div className="w-[300px] mt-2 mx-auto">
                  <AdvancedImage
                    className="max-w-full"
                    cldImg={myImage}
                    plugins={[responsive(), placeholder()]}
                  />
                </div>
              </div>
              <div className="mt-2">
                <Button
                  type="green"
                  data-testid="add-btn"
                  onClick={handleSubmit}
                >
                  Add
                </Button>
                <Button type="green" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </Form>
          </div>
        </>
      ) : (
        <p>You must be logged in to add a character</p>
      )}
    </>
  )
}

export default AddCharacter
