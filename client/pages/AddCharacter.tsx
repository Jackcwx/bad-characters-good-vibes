import { Button } from '@/components/Button'
import PageTitle from '@/components/PageTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-router-dom'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

function AddCharacter() {
  return (
    <>
      <>
        <PageTitle title="Create Character" />
        <div>
          <Form>
            <label>Name</label>
            <div style={{ marginTop: '5px' }}>
              <input
                type="name"
                placeholder="Example"
                style={{
                  padding: '5px',
                  width: '50%',
                  border: '1px solid white',
                }}
              ></input>
            </div>
            <div style={{ marginTop: '5px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Bio
              </label>
              <textarea
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
              <Button type="green">
                <FontAwesomeIcon icon={faUpload} />
              </Button>
            </div>
            <div style={{ marginTop: '15px' }}>
              <Button type="green">Add</Button>
              <Button type="green">Clear</Button>
            </div>
          </Form>
        </div>
      </>
    </>
  )
}

export default AddCharacter
