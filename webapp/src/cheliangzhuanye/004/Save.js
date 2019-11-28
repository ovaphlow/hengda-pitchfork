import React from 'react'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar } from './Components'

function Save() {
  return (
    <>
      <Title />

      <Navbar category="车辆专业" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="004" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>一体化作业申请单 - 新增申请</h2>
            <hr />
            <Toolbar />
            <div className="card shadow mt-2">
              <div className="card-body">

              </div>

              <div className="card-footer">
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary">
                    <i className="fa fa-fw fa-check"></i>
                    确定
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Save
