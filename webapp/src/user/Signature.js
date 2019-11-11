import React from 'react'

import { Title, Navbar } from '../Components'

const Signature = () => {
  React.useEffect(() => {
    console.info(1)
  }, [])

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <h1>HOME</h1>
      </div>
    </>
  )
}

export default Signature
