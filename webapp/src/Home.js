import React from 'react'

import { Title, Navbar } from './components'

const Home = () => {
  React.useEffect(() => {
    let a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) {
      window.location = '#登录'
      return
    }
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
