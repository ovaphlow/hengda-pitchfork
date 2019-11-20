import React from 'react'
import axios from 'axios'
import md5 from 'blueimp-md5'

import { Title, Navbar } from '../Components'
import { SideNav } from './Components'

function ChangePassword() {
  const [data, setData] = React.useState({
    password: '',
    password1: '',
    password2: ''
  })

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return
    if (!!!data.password || !!!data.password1 || !!!data.password2) {
      window.alert('请完整填写所需信息')
      return
    }
    if (data.password1 !== data.password2) {
      window.alert('两次输入的新密码不一致')
      return
    }
    const res = await axios.put(`/api/user/${auth.id}/password`, {
      id: auth.id,
      password: md5(data.password),
      password1: md5(data.password1)
    })
    if (res.data.message) {
      window.alert(res.data.message)
      return
    }
    window.location = '#登录'
  }

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="password" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>修改密码</h2>
            <hr />

            <div className="card shadow">
              <div className="card-header">
                <span className="text-danger">修改密码后需要重新登录</span>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>当前密码</label>
                      <input type="password" name="password" value={data.password || ''}
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>新密码</label>
                      <input type="password" name="password1" value={data.password1 || ''}
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>重复新密码</label>
                      <input type="password" name="password2" value={data.password2 || ''}
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
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

export default ChangePassword
