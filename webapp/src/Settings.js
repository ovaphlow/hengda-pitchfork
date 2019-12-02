import React from 'react'

import { Title, Navbar, DeptPickerById } from './Components'

function Settings() {
  const [data, setData] = React.useState({
    dept_id_team: 0,
    dept_id_qc: 0
  })
  const [dataTeam, setDataTeam] = React.useState([])
  const [dataQc, setDataQc] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/common/team/`)
      const res = await response.json()
      setDataTeam(res.content)
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/common/qc/`)
      const res = await response.json()
      setDataQc(res.content)
    }
    fetchData()
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleMarkTeam = async () => {
    const response = await fetch(`/api/common/dept/${data.dept_id_team}/mark-team`, {
      method: 'PUT'
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
  }

  const handleUnmark = async event => {
    const response = await fetch(`/api/common/dept/${event.target.getAttribute('data-id')}/unmark`, {
      method: 'PUT'
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
  }

  const handleMarkQc = async () => {
    const response = await fetch(`/api/common/dept/${data.dept_id_qc}/mark-qc`, {
      method: 'PUT'
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
  }

  return (
    <>
      <Title />

      <Navbar category="系统设置" />

      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-3 col-md-4">
            <div className="card shadow">
              <div className="card-header">设置班组</div>
              <div className="card-body">
                <DeptPickerById caption="选择部门" name="dept_id_team" value={data.dept_id_team || ''}
                    handleChange={handleChange} />
                <button type="button" className="btn btn-block btn-outline-primary" onClick={handleMarkTeam}>
                  <i className="fa fa-fw fa-plus"></i>
                  添加
                </button>

                <hr />

                <h4 className="text-center"><span className="lead text-secondary">班组</span></h4>
                <ul className="list-unstyled">
                  {dataTeam.map(it => (
                    <div key={it.id}>
                      <li>
                        {it.v}
                        <i className="fa fa-fw fa-times text-danger" data-id={it.id} onClick={handleUnmark}></i>
                        <span className="text-secondary pull-right">{it.dept0}</span>
                      </li>
                      <div className="clearfix"></div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-3 col-md-4">
            <div className="card shadow">
              <div className="card-header">设置质检</div>
              <div className="card-body">
                <DeptPickerById caption="选择部门" name="dept_id_qc" value={data.dept_id_qc || ''}
                    handleChange={handleChange} />
                <button type="button" className="btn btn-block btn-outline-primary" onClick={handleMarkQc}>
                  <i className="fa fa-fw fa-plus"></i>
                  添加
                </button>

                <hr />

                <h4 className="text-center"><span className="lead text-secondary">质检</span></h4>
                <ul className="list-unstyled">
                  {dataQc.map(it => (
                    <div key={it.id}>
                      <li>
                        {it.v}
                        <i className="fa fa-fw fa-times text-danger" data-id={it.id} onClick={handleUnmark}></i>
                        <span className="text-secondary pull-right">{it.dept0}</span>
                      </li>
                      <div className="clearfix"></div>
                    </div>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings