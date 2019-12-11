import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, TableDetail1, TableDetail4 } from './Components'

function ReviewTeam() {
  const { id } = useParams()
  const [auth, setAuth] = React.useState(0)
  const [dataDetail1, setDataDetail1] = React.useState([])
  const [dataDetail2, setDataDetail2] = React.useState([])
  const [dataDetail3, setDataDetail3] = React.useState([])
  const [dataDetail4, setDataDetail4] = React.useState([])

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) return
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
      setDataDetail1(JSON.parse(res.content.detail1.value))
      setDataDetail2(JSON.parse(res.content.detail2.value))
      setDataDetail3(JSON.parse(res.content.detail3.value))
      setDataDetail4(JSON.parse(res.content.detail4.value))
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmitDetail1Team = async event => {
    let list = dataDetail1.carriage.concat()
    list[parseInt(event.target.getAttribute('data-id'))].team = event.target.value === '未确认' ? '未确认' : auth.name
    const response = await fetch(`/api/cheliang/004/${id}/detail/1`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({detail1: JSON.stringify(Object.assign(dataDetail1, {carriage: list}))})
    })
    const res = await response.json()
    if (res.message) {
      window.alert('与服务器通信异常，请刷新页面。')
      return
    }
    setDataDetail1(Object.assign(dataDetail1, {carriage: list}))
  }

  const handleSubmitDetail4Team = async event => {

  }

  const handleSubmit = async () => {
    const el = document.querySelectorAll('select')
    for (let i = 0; i < el.length; i++) {
      if (!!!el[i].value) {
        window.alert('请完整填写所需信息')
        return
      }
    }
    const body = {
      team: auth.name,
      team_id: auth.id,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    const response = await fetch(`/api/cheliang/004/${id}/review/team`, {
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
            <h2>一体化作业申请单 - 班组销记</h2>
            <hr />
            <Toolbar />

            <div className="mt-2"></div>
            {dataDetail1.carriage && (
              <TableDetail1 dataHeader={dataDetail1} dataList={dataDetail1.carriage}
                auth={auth} mode="team"
                handleSubmit={handleSubmitDetail1Team}
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

export default ReviewTeam