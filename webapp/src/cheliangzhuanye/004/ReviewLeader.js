import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar } from './Components'

/**
 * 需要补充子单数据
 */
function ReviewLeader() {
  const { id } = useParams()
  const [auth, setAuth] = React.useState(0)

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

  const handleSubmit = async () => {
    const body = {
      leader: auth.name,
      leader_id: auth.id,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    const response = await fetch(`/api/cheliang/004/${id}/review/leader`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = `#车辆专业/004/${id}`
  }

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
              <div className="card-body">
                子单销记
              </div>
              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-secondary"
                      onClick={() => window.history.go(-1)}>
                    返回
                  </button>
                </div>
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

export default ReviewLeader