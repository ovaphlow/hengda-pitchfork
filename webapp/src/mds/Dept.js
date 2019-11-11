import React from 'react'

import { Title, Navbar } from '../Components'
import { SideNav } from './Components'

const Toolbar = () => {
  return (
    <>
      <div className="btn-group">
        <a href="#数据管理/部门结构/新增" className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href="#数据管理/部门结构" className="btn btn-sm btn-outline-secondary">
          <i className="fa fa-fw fa-list"></i>
          列表
        </a>
      </div>
    </>
  )
}

const ToolbarSub = props => {
  return (
    <>
      <div className="btn-group">
        <a href={`#数据管理/部门结构/${props.item.id}/新增`} className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>
    </>
  )
}

export const List = () => {
  const [list, setList] = React.useState([])

  React.useEffect(() => {
    fetch(`/api/common/dept/`)
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        setList(res.content)
      })
      .catch(err => window.console.error(err))
  }, [])

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="dept" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>部门结构</h2>
            <hr />

            <Toolbar />

            <div className="card shadow mt-2">
              <div className="card-body">
                <div className="list-group">
                  {
                    list.map(it => (
                      <a href={`#数据管理/部门结构/${it.id}`} className="list-group-item list-group-item-action" key={it.id}>
                        {it.v}
                        <span className="pull-right text-muted">
                          下属部门数量：{it.qty}
                        </span>
                      </a>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const Save = props => {
  const [master, setMaster] = React.useState(0)
  const [item, setItem] = React.useState({
    v: '',
    remark: ''
  })

  React.useEffect(() => {
    if (!!!props.match.params.id) return
    fetch(`/api/common/dept/${props.match.params.id}`)
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        setMaster(res.content)
      })
      .catch(err => window.console.error(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    fetch(`/api/common/dept/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        window.location = '#数据管理/部门结构'
      })
      .catch(err => window.console.error(err))
  }

  const handleSaveSub = () => {
    fetch(`/api/common/dept/${master.id}/sub`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        window.location = `#数据管理/部门结构/${master.id}`
      })
      .catch(err => window.console.error(err))
  }

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="dept" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>
              部门结构 - 新增
              {
                props.match.params.id > 0 && (
                  <span className="pull-right text-muted">{master.v}</span>
                )
              }
            </h2>
            <hr />

            {
              !!!props.match.params.id && <Toolbar />
            }

            <div className="card shadow mt-2">
              <div className="card-body">
                <div className="form-group">
                  <label>名称</label>
                  <input type="text" name="v" value={item.v}
                      className="form-control"
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>备注</label>
                  <input type="text" name="remark" value={item.remark}
                      className="form-control"
                      onChange={handleChange}
                  />
                </div>
              </div>

              <div className="card-footer">
                {
                  props.match.params.id > 0 && (
                    <div className="btn-group">
                      <a href={`#数据管理/部门结构/${master.id}`} className="btn btn-secondary">
                        返回
                      </a>
                    </div>
                  )
                }

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={props.match.params.id ? handleSaveSub : handleSave}>
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

export const Update = props => {
  const [item, setItem] = React.useState(0)
  const [list, setList] = React.useState([])

  React.useEffect(() => {
    fetch(`/api/common/dept/${props.match.params.id}`)
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        setItem(res.content)
      })
      .catch(err => window.console.error(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    fetch(`/api/common/dept/${props.match.params.id}/sub`)
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        setList(res.content)
      })
      .catch(err => window.console.error(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = () => {
    fetch(`/api/common/dept/:id`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        handleBack()
      })
      .catch(err => window.console.error(err))
  }

  const handleDetail = event => {
    window.location = `#数据管理/部门结构/${event.target.getAttribute('data-id')}`
    window.location.reload(true)
  }

  const handleBack = () => {
    if (!!!item.master_id) {
      window.location = '#数据管理/部门结构'
    } else {
      window.location = `#数据管理/部门结构/${item.master_id}`
      window.location.reload(true)
    }
  }

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="dept" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>部门结构 - {item.v}</h2>
            <hr />

            <div className="card shadow mb-3">
              <div className="card-body">
                <div className="form-group">
                  <label>名称</label>
                  <input type="text" name="v" value={item.v}
                      className="form-control"
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>备注</label>
                  <input type="text" name="remark" value={item.remark}
                      className="form-control"
                      onChange={handleChange}
                  />
                </div>
              </div>

              <div className="card-footer">
                {
                  item.master_id > 0 && (
                    <div className="btn-group">
                      <button type="button" className="btn btn-secondary" onClick={handleBack}>
                        返回
                      </button>
                    </div>
                  )
                }

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                    <i className="fa fa-fw fa-check"></i>
                    确定
                  </button>
                </div>
              </div>
            </div>

            <hr />

            <ToolbarSub item={item} />

            <div className="card shadow mt-2">
              <div className="card-header">
                <span className="lead text-muted">
                  下属部门
                </span>
              </div>

              <div className="card-body">
                <ul className="list-group">
                  {
                    list.map(it => (
                      <li className="list-group-item list-group-item-action" data-id={it.id} key={it.id} onClick={handleDetail}>
                        {it.v}
                        <span className="pull-right text-muted" data-id={it.id}>
                          下属部门数量：{it.qty || 0}
                        </span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
