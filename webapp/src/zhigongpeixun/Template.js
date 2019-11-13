import React from 'react'

import { Title, Navbar } from '../Components'
import { SideNav } from './Components'

const Template = () => {
  return (
    <>
      <Title />

      <Navbar category="职工培训" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="1" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>职工培训台帐 - 模板</h2>
            <hr />
          </div>
        </div>
      </div>
    </>
  )
}

export default Template
