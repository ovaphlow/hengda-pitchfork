import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Title, Navbar} from '../Components'
import { SideNav, ModelPicker } from './Components'

const Toolbar = () => {
  return (
    <>
      <div className="btn-group">
        <a href={`#数据管理/车组/新增`} className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href={`#数据管理/车组`} className="btn btn-sm btn-outline-secondary">
          <i className="fa fa-fw fa-list"></i>
          列表
        </a>
      </div>
    </>
  )
}

const Form = props => {
  return (
    <>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>名称</label>
            <input type="text" name="name" value={props.data.name}
                className="form-control"
                onChange={props.handleChange}
            />
          </div>
        </div>

        <div className="col">
          <ModelPicker name="master_id" value={props.data.master_id} onChange={props.handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label>备注</label>
        <input type="text" name="remark" value={props.data.remark}
            className="form-control"
            onChange={props.handleChange}
        />
      </div>
    </>
  )
}

export const List = () => {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/train/`)
      if (result.data.message) {
        window.alert(result.data.message)
        return
      }
      setData(result.data.content)
    }
    fetchData()
  }, [])

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="train" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>车组</h2>
            <hr />

            <Toolbar />

            <div className="card shadow mt-2">
              <div className="card-body">
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>序号</th>
                      <th>名称</th>
                      <th>车型</th>
                      <th>备注</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      data.map(it => (
                        <tr key={it.id}>
                          <td>
                            <a href={`#数据管理/车组/${it.id}`}>
                              <i className="fa fa-fw fa-edit"></i>
                            </a>
                            <span className="pull-right">{it.id}</span>
                          </td>
                          <td>{it.name}</td>
                          <td>{it.model}</td>
                          <td>{it.remark}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const Save = () => {
  const [data, setData] = React.useState({
    name: '',
    master_id: '0',
    remark: ''
  })

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!!!data.name || !!!data.master_id) {
      window.alert('请完整填写所需信息')
      return
    }
    const result = await axios.post(`/api/train/`, data)
    if (result.data.message) {
      window.alert(result.data.message)
      return
    }
    window.location = '#数据管理/车组'
  }

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="train" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>车组 - 新增</h2>
            <hr />

            <Toolbar />

            <div className="card shadow mt-2">
              <div className="card-body">
                <Form data={data} handleChange={handleChange} />
              </div>

              <div className="card-footer">
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleSave} >
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

export const Update = () => {
  const { id } = useParams()
  const [data, setData] = React.useState(0)

  React.useEffect(() => {
    const fetchData = async id => {
      const result = await axios.get(`/api/train/${id}`)
      if (result.data.message) {
        window.alert(result.data.message)
        return
      }
      setData(result.data.content)
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    const result = await axios.delete(`/api/train/${id}`)
    if (result.data.message) {
      window.alert(result.data.message)
      return
    }
    window.location = '#数据管理/车组'
  }

  const handleUpdate = async () => {
    if (!!!data.name || !!!data.master_id) {
      window.alert('请完整填写所需信息')
      return
    }
    const result = await axios.put(`/api/train/${id}`, data)
    if (result.data.message) {
      window.alert(result.data.message)
      return
    }
    window.location = '#数据管理/车组'
  }

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="train" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>车组 - 编辑</h2>
            <hr />

            <Toolbar />

            <div className="card shadow mt-2">
              <div className="card-body">
                <Form data={data} handleChange={handleChange} />
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-danger" onClick={handleRemove}>
                    删除
                  </button>
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleUpdate} >
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
