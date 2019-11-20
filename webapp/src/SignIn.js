import React from 'react'
import { useLocation } from 'react-router-dom'
import md5 from 'blueimp-md5'

import { Title, Navbar } from './Components'

const SignIn = props => {
  const [item, setItem] = React.useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    const { value, name } = e.target
    setItem(prev => ({ ...prev, [name]: value}))
  }

  const handleSignIn = async () => {
    const response = await fetch(`/api/user/sign-in`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({username: item.username, password: md5(item.password)})
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    sessionStorage.setItem('auth', JSON.stringify(res.content))
    window.location = '#/'
  }

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-6 offset-3 col-lg-4 offset-lg-4">
            <h1 className="text-center">用户 登录</h1>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-6 offset-3 col-lg-4 offset-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <div className="form-group">
                  <label>用户名</label>
                  <input type="text" name="username" value={item.username}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>密码</label>
                  <input type="password" name="password" value={item.password}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="card-footer">
                <button type="button" className="btn btn-block btn-primary" onClick={handleSignIn}>
                  <i className="fa fa-fw fa-sign-in"></i>
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
