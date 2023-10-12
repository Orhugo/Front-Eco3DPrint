import React from 'react'
import Dropzone from '../components/Dropzone'

function UploadFile() {
  return (
    <section className='section'>
        <div className='container'>
            <h1 className='title'>Upload File</h1>
            <Dropzone />
        </div>
    </section>
  )
}

export default UploadFile