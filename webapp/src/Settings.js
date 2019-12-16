import React from 'react'

import { Title, Navbar, DeptPickerById, UserPickerById } from './Components'

function Settings() {
  const [data, setData] = React.useState({
    dept_id_team: 0,
    dept_id_qc: 0,
    user_id_p_jsy: 0,
    user_id_p_dd: 0,
    user_id_p_zbsz: 0,
    user_id_leader: 0
  })
  const [dataTeam, setDataTeam] = React.useState([])
  const [dataQc, setDataQc] = React.useState([])
  const [dataPjsy, setDataPjsy] = React.useState([])
  const [dataPdd, setDataPdd] = React.useState([])
  const [dataPzbsz, setDataPzbsz] = React.useState([])
  const [dataLeader, setDataLeader] = React.useState([])

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

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/auth/p_jsy`)
      const res = await response.json()
      setDataPjsy(res.content)
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/auth/p_dd`)
      const res = await response.json()
      setDataPdd(res.content)
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/auth/p_zbsz`)
      const res = await response.json()
      setDataPzbsz(res.content)
      console.info(res.content)
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/auth/leader`)
      const res = await response.json()
      setDataLeader(res.content)
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

  const handleGrantAuthPjsy = async () => {
    const response = await fetch(`/api/user/${data.user_id_p_jsy}/auth/p_jsy`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({'auth_p_jsy': 1})
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
  }

  const handleRemoveAuthPjsy = async event => {
    const response = await fetch(`/api/user/${event.target.getAttribute('data-id')}/auth/p_jsy`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({auth_p_jsy: 0})
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
  }

  const handleGrantAuthPdd = async () => {
    const response = await fetch(`/api/user/${data.user_id_p_dd}/auth/p_dd`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({'auth_p_dd': 1})
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
  }

  const handleRemoveAuthPdd = async event => {
    const response = await fetch(`/api/user/${event.target.getAttribute('data-id')}/auth/p_dd`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({auth_p_dd: 0})
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
  }

  const handleGrantAuthPzbsz = async () => {
    const response = await fetch(`/api/user/${data.user_id_p_zbsz}/auth/p_zbsz`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({'auth_p_zbsz': 1})
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
  }

  const handleRemoveAuthPzbsz = async event => {
    const response = await fetch(`/api/user/${event.target.getAttribute('data-id')}/auth/p_zbsz`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({auth_p_zbsz: 0})
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
  }

  const handleGrantAuthLeader = async () => {
    const response = await fetch(`/api/user/${data.user_id_leader}/auth/leader`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({'auth_leader': 1})
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
  }

  const handleRemoveAuthLeader = async event => {
    const response = await fetch(`/api/user/${event.target.getAttribute('data-id')}/auth/leader`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({auth_leader: 0})
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

        <div className="row justify-content-center mt-5">
          <div className="col-3 col-md-4">
            <div className="card shadow">
              <div className="card-header">技术员</div>
              <div className="card-body">
                <UserPickerById caption="选择用户" name="user_id_p_jsy" value={data.user_id_p_jsy}
                    handleChange={handleChange} />
                <button type="button" className="btn btn-block btn-outline-primary" onClick={handleGrantAuthPjsy}>
                  <i className="fa fa-fw fa-plus"></i>
                  添加
                </button>

                <hr />

                <h4 className="text-center"><span className="lead text-secondary">技术员</span></h4>
                <ul className="list-unstyled">
                  {dataPjsy.map(it => (
                    <div key={it.id}>
                      <li>
                        {it.name}
                        <i className="fa fa-fw fa-times text-danger" data-id={it.id} onClick={handleRemoveAuthPjsy}></i>
                        <span className="text-secondary pull-right">{it.dept}</span>
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
              <div className="card-header">调度</div>
              <div className="card-body">
                <UserPickerById caption="选择用户" name="user_id_p_dd" value={data.user_id_p_dd}
                    handleChange={handleChange} />
                <button type="button" className="btn btn-block btn-outline-primary" onClick={handleGrantAuthPdd}>
                  <i className="fa fa-fw fa-plus"></i>
                  添加
                </button>

                <hr />

                <h4 className="text-center"><span className="lead text-secondary">调度</span></h4>
                <ul className="list-unstyled">
                  {dataPdd.map(it => (
                    <div key={it.id}>
                      <li>
                        {it.name}
                        <i className="fa fa-fw fa-times text-danger" data-id={it.id} onClick={handleRemoveAuthPdd}></i>
                        <span className="text-secondary pull-right">{it.dept}</span>
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
              <div className="card-header">值班所长</div>
              <div className="card-body">
                <UserPickerById caption="选择用户" name="user_id_p_zbsz" value={data.user_id_p_zbsz}
                    handleChange={handleChange} />
                <button type="button" className="btn btn-block btn-outline-primary" onClick={handleGrantAuthPzbsz}>
                  <i className="fa fa-fw fa-plus"></i>
                  添加
                </button>

                <hr />

                <h4 className="text-center"><span className="lead text-secondary">值班所长</span></h4>
                <ul className="list-unstyled">
                  {dataPzbsz.map(it => (
                    <div key={it.id}>
                      <li>
                        {it.name}
                        <i className="fa fa-fw fa-times text-danger" data-id={it.id} onClick={handleRemoveAuthPzbsz}></i>
                        <span className="text-secondary pull-right">{it.dept}</span>
                      </li>
                      <div className="clearfix"></div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-3 col-md-4">
            <div className="card shadow">
              <div className="card-header">工长</div>
              <div className="card-body">
                <UserPickerById caption="选择用户" name="user_id_leader" value={data.user_id_leader}
                  handleChange={handleChange}
                />
                <button type="button" className="btn btn-block btn-outline-primary" onClick={handleGrantAuthLeader}>
                  <i className="fa fa-fw fa-plus"></i>
                  添加
                </button>
                <hr />

                <h4 className="text-center"><span className="lead text-secondary">工长</span></h4>
                <ul className="list-unstyled">
                  {dataLeader.map(it => (
                    <div key={it.id}>
                      <li>
                        {it.name}
                        <i className="fa fa-fw fa-times text-danger" data-id={it.id} onClick={handleRemoveAuthLeader}></i>
                        <span className="text-secondary pull-right">{it.dept}</span>
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