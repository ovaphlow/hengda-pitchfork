import React from 'react'

import { Title, Navbar } from './components'

const Home = () => {
  React.useEffect(() => {
    console.info(111)
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

export default Home
