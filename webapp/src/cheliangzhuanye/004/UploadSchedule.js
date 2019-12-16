import React from 'react'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar } from './Components'

function UploadSchedule() {
  const handleSave = async () => {}

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
            <h2>一体化作业申请单 - 上传作业计划</h2>
            <hr />
            <Toolbar />

            <div className="card shadow mt-2">
              <div className="card-body">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="customFileLang" />
                  <label className="custom-file-label" htmlFor="customFileLang" data-browse="浏览">选择后缀名为xlsx的Excel文件</label>
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
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

export default UploadSchedule