import React from 'react'
// import { useParams } from 'react-router-dom'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar } from './Components'

function ReviewPgz() {
  // const { id } = useParams()
  const [auth, setAuth] = React.useState(0)
  // const [data, setData] = React.useState({
  //   remark: ''
  // })

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) {
      window.location = '#登录'
      return
    }
    setAuth(a)
  }, [])

  // const handleChange = e => {
  //   const { value, name } = e.target
  //   setData(prev => ({ ...prev, [name]: value }))
  // }

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
            <h2>一体化作业申请单 - 工长销记</h2>
            <hr />
            <Toolbar />
            <div className="card shadow mt-2 mb-5">
              {auth}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewPgz
