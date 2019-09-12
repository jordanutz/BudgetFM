import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const PreLoader = () => {
  return (
    <section className="PreLoader">
      <Loader
        type="Audio"
        color="#1E1F22"
        height={100}
        width={100}
        timeout={1000000}
      />
    </section>
  )
}

export default PreLoader