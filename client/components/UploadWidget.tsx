import { createContext, useEffect, useState } from 'react'
import { CloudinaryResult, Uwconfig, ImageInfo } from '@models/cloudinary'
/// <reference path="../../../models/cloudinary.d.ts" />

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext({ loaded: false })

export interface Props {
  uwConfig: Uwconfig
  setImageInfo: (imageInfo: ImageInfo) => void // not the right type
}

function UploadWidget({ uwConfig, setImageInfo }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById('uw')
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement('script')
        script.setAttribute('async', '')
        script.setAttribute('id', 'uw')
        script.src = 'https://upload-widget.cloudinary.com/global/all.js'
        script.addEventListener('load', () => setLoaded(true))
        document.body.appendChild(script)
      } else {
        // If already loaded, update the state
        setLoaded(true)
      }
    }
  }, [loaded])

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: Error, result: CloudinaryResult) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info)
            console.log('result: ', result)
            setImageInfo({
              publicId: result.info.public_id,
              secure_url: result.info.secure_url,
            })
          }
        },
      )
      document.getElementById('upload_widget')!.addEventListener(
        'click',
        function () {
          myWidget.open()
        },
        false,
      )
    }
  }

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  )
}

export default UploadWidget
export { CloudinaryScriptContext }
