import React from 'react'

import { Title, Navbar } from '../Components'
import { SideNav } from './Components'

const Info = () => {
  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="info" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>用户信息</h2>
            <hr />
          </div>
        </div>
      </div>
    </>
  )
}

export default Info
