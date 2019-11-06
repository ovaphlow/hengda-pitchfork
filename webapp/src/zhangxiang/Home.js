import React from 'react'

import { Title, Navbar } from '../Components'
import { SideNav } from './Components'

const Home = () => {
  return (
    <>
      <Title />

      <Navbar category="zhangxiang" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav />
          </div>

          <div className="col-9 col-lg-10">
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
