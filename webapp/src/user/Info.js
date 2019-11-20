import React from 'react'
import axios from 'axios'

import { Title, Navbar } from '../Components'
import { SideNav } from './Components'

function Info() {
  const [data, setData] = React.useState(0)
  const [signature, setSignature] = React.useState(0)

  React.useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!user) {
      window.location = '#登录'
      return
    }

    const fetchData = async () => {
      const result = await axios.get(`/api/user/${user.id}`)
      if (result.data.message) {
        window.alert(result.data.message)
        return
      }
      setData(result.data.content)
    }
    fetchData()

    const fetchSignature = async () => {
      const result = await axios.get(`/api/user/${user.id}/signature`)
      if (result.data.message) {
        window.alert(result.data.message)
        return
      }
      setSignature(result.data.content)
    }
    fetchSignature()
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    const user = JSON.parse(sessionStorage.getItem('auth'))
    const result = await axios.put(`/api/user/${user.id}`, data)
    if (result.data.message) {
      window.alert(result.data.message)
      return
    }
    window.location.reload(true)
  }

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

            <div className="card shadow">
              <div className="card-header">
                <span className="text-danger">修改用户信息后需要重新登录</span>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-3">
                    <div className="form-group">
                      <label>姓名</label>
                      <input type="text" name="name" value={data.name || ''}
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="form-group">
                      <label>用户名</label>
                      <input type="text" name="username" value={data.username || ''}
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>电话</label>
                      <input type="text" name="phone" value={data.phone || ''}
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>部门</label>
                      <input type="text" name="dept" value={data.dept || ''} readOnly
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>权限：管理员</label>
                      <input type="text" name="super" value={data.super === 1 ? '是' : '否'} readOnly
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>备注</label>
                  <input type="text" name="remark" value={data.remark || ''}
                      className="form-control"
                      onChange={handleChange}
                  />
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                    <i className="fa fa-fw fa-check"></i>
                    确定
                  </button>
                </div>
              </div>
            </div>

            <div className="card shadow mt-2">
              <div className="card-body">
                <span className="text-center">
                  <img src={signature.data_url || ''} alt="签名" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Info
