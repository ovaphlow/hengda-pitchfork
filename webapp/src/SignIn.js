import React from 'react'

import { Title, Navbar } from './components'

const SignIn = props => {
  const [item, setItem] = React.useState({
    username: '',
    password: ''
  })

  React.useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setItem(prev => ({ ...prev, [name]: value}))
  }

  const handleSignIn = () => {
    if (props.match.path === '/登录') {
      console.info('standard')
    } else if (props.match.path === '/数据管理/登录') {
      console.info('super')
    } else {
      window.alert('URL错误')
    }
  }

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-6 offset-3 col-lg-2 offset-lg-5">
            <h1 className="text-center">登录</h1>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-6 offset-3 col-lg-2 offset-lg-5">
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
