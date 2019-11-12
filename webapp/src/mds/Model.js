import React from 'react'

import { Title, Navbar } from '../Components'
import { SideNav } from './Components'

export const List = () => {
  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="model" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>车型</h2>
            <hr />
          </div>
        </div>
      </div>
    </>
  )
}
