import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, TableDetail2, TableDetail3 } from './Components'

function ReviewPjsy() {
  const { id } = useParams()
  const [auth, setAuth] = React.useState(0)
  const [dataDetail2, setDataDetail2] = React.useState([])
  const [dataDetail3, setDataDetail3] = React.useState([])

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) {
      window.location = '#登录'
      return
    }
    setAuth(a)
  }, [])

  React.useEffect(() => {
    const fetchData = async id => {
      const response = await fetch(`/api/cheliang/004/${id}`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataDetail2(JSON.parse(res.content.detail2.value))
      setDataDetail3(JSON.parse(res.content.detail3.value))
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmitDetail2Pjsy = async event => {
    let list = dataDetail2.concat()
    list[parseInt(event.target.getAttribute('data-id'))].p_jsy = event.target.value === '未确认' ? '未确认' : auth.name
    const response = await fetch(`/api/cheliang/004/${id}/detail/2`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({detail2: JSON.stringify(list)})
    })
    const res = await response.json()
    if (res.message) {
      window.alert('与服务器通信异常，请刷新页面。')
      return
    }
    setDataDetail2(list)
  }

  const handleSubmitDetail3Pjsy = async event => {
    let list = dataDetail3.concat()
    list[parseInt(event.target.getAttribute('data-id'))].p_jsy = event.target.value === '未确认' ? '未确认' : auth.name
    const response = await fetch(`/api/cheliang/004/${id}/detail/3`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({detail3: JSON.stringify(list)})
    })
    const res = await response.json()
    if (res.message) {
      window.alert('与服务器通信异常，请刷新页面。')
      return
    }
    setDataDetail3(list)
  }

  const handleSubmit = async () => {
    const body = {
      auth_name: auth.name,
      auth_id: auth.id,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    const response = await fetch(`/api/cheliang/004/${id}/review/p_jsy`, {
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
            <h2>一体化作业申请单 - 技术员销记</h2>
            <hr />
            <Toolbar />

            <div className="mt-2"></div>
            {dataDetail2.length > 0 && (
              <TableDetail2 data={dataDetail2} auth={auth} mode="p_jsy"
                handleSubmitPjsy={handleSubmitDetail2Pjsy}
              />
            )}

            <div className="mt-2"></div>
            {dataDetail3.length > 0 && (
              <TableDetail3 data={dataDetail3} auth={auth} mode="p_jsy"
                handleSubmitPjsy={handleSubmitDetail3Pjsy}
              />
            )}

            <div className="card shadow mt-2 mb-5">
              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => window.history.go(-1)}>
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

export default ReviewPjsy
