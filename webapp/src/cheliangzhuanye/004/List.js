import React from 'react'
import axios from 'axios'
import moment from 'moment'

import { Title, Navbar, TrainPicker, DeptPicker } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, ListItem } from './Components'

function List() {
  const [auth, setAuth] = React.useState(0)
  const [data, setData] = React.useState([])
  const [filterParams, setFilterParams] = React.useState({
    train: '',
    dept: '',
    datime_begin: '',
    datime_end: '',
    title: '',
    content: '',
    p_yq_xdc: '',
    p_yq_jcw: ''
  })
  const [timer, setTimer] = React.useState(15)

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) return
    setAuth(a)
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/cheliang/004`)
      if (result.data.message) {
        window.alert(result.data.message)
        return
      }
      setData(result.data.content)
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    let time = moment()
    let time1 = moment(time).add(15, 'm')
    setTimer(moment(time).to(time1))
    const timeInterval = setInterval(() => {
      time = moment(time).add(1, 'm')
      if (moment(time1).diff(time) <= 0) {
        handleRefresh()
      }
      setTimer(moment(time).to(time1))
    }, 1000 * 60)

    return (() => clearInterval(timeInterval))
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setFilterParams(prev => ({ ...prev, [name]: value }))
  }

  const handleRefresh = () => {
    // 15min自动刷新
    window.location.reload(true)
  }

  const handleListByUser = async () => {
    const response = await fetch(`/api/cheliang/004/user/${auth.id}`)
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    setData(res.content)
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
            <h2>一体化作业申请单</h2>
            <hr />
            <Toolbar />
            <div className="card shadow mt-2 mb-5">
              <div className="card-header">
                <div className="row">
                  <div className="col">
                    <TrainPicker caption="车组" name="train" value={filterParams.train}
                        handleChange={handleChange} />
                  </div>

                  <div className="col">
                    <DeptPicker caption="部门" name="dept" value={filterParams.dept}
                        handleChange={handleChange} />
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>申请作业时间 - 起</label>
                      <input type="datetime-local" name="datime_begin" value={filterParams.datime_begin}
                          className="form-control"
                          onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>申请作业时间 - 止</label>
                      <input type="datetime-local" name="datime_end" value={filterParams.datime_end}
                          className="form-control"
                          onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>作业类别</label>
                      <select name="title" value={filterParams.title}
                          className="form-control"
                          onChange={handleChange}>
                        <option value="">未选择</option>
                        <option value="普查">普查</option>
                        <option value="检查">检查</option>
                        <option value="故障处理">故障处理</option>
                        <option value="加装改造">加装改造</option>
                        <option value="其它">其它</option>
                      </select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>作业内容</label>
                      <input type="text" name="content" value={filterParams.content}
                          className="form-control"
                          onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>蓄电池</label>
                      <select name="p_yq_xdc" value={filterParams.p_yq_xdc}
                          className="form-control"
                          onChange={handleChange}>
                        <option value="">无要求</option>
                        <option value="">供</option>
                        <option value="">断</option>
                      </select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>接触网</label>
                      <select name="p_yq_jcw" value={filterParams.p_yq_jcw}
                          className="form-control"
                          onChange={handleChange}>
                        <option value="">无要求</option>
                        <option value="">供</option>
                        <option value="">断</option>
                      </select>
                    </div>
                  </div>
                </div>

                <>
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleRefresh}>
                      <i className="fa fa-fw fa-refresh"></i>
                      重置/刷新 ({timer})
                    </button>
                  </div>

                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-sm btn-outline-info" onClick={handleListByUser}>
                      <i className="fa fa-fw fa-user"></i>
                      我的申请单
                    </button>

                    <button type="button" className="btn btn-sm btn-outline-secondary">
                      <i className="fa fa-fw fa-archive"></i>
                      已完成申请单
                    </button>

                    <button type="button" className="btn btn-sm btn-outline-primary">
                      <i className="fa fa-fw fa-search"></i>
                      查询
                    </button>
                  </div>
                </>
              </div>

              <div className="card-body">
                <ul className="list-group">
                  {data.map(it => (
                    <ListItem key={it.id} data={it} auth={auth} />
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

export default List
