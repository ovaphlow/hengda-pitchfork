import React from 'react'
import moment from 'moment'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, Form } from './Components'

function Save() {
  const [list, setList] = React.useState([])
  const [data, setData] = React.useState({
    category: '',
    dept: '',
    leader: '',
    leader_phone: '',
    operator: '',
    operator_phone: '',
    train: '',
    date_begin: '',
    time_begin: '',
    date_end: '',
    time_end: '',
    title: '普查',
    content: '',
    p_yq_xdc: '',
    p_yq_jcw: '',
    p_yq_zydd: '',
    p_yq_qt: ''
  })

  React.useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return
    const date = moment().format('YYYY-MM-DD')
    setData(prev => ({
      ...prev,
      'dept': auth.dept,
      'operator': auth.name,
      'operator_phone': auth.phone,
      'date_begin': date,
      'date_end': date,
    }))

    const fetchData = async body => {
      const response = await fetch(`/api/cheliang/004/schedule/`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      setList(res.content)
      console.info(res.content)
    }
    fetchData({master_id: auth.master_id, date_begin: moment().format('YYYY-MM-DD')})
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handlePickSchedule = async event => {
    console.info(list[parseInt(event.target.value)])

    setData(list[parseInt(event.target.value)])
  }

  const handleSave = async => {

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
            <h2>一体化作业申请单 - 新增申请</h2>
            <hr />
            <Toolbar />

            <div className="card shadow mt-2">
              <div className="card-header">
                <div className="form-group">
                  <label>选择所属部门的作业计划</label>
                  <select className="form-control" onClick={handlePickSchedule}>
                    <option value="">未选择</option>
                    {list.map((it, index) => (
                      <option key={it.id} value={index}>
                        「{it.category}」{it.train} - [{it.title}] {it.content}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="card-body">
                {data && data.id > 0 && (
                  <Form data={data} handleChange={handleChange} />
                )}
              </div>

              <div className="card-footer">
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
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

export default Save
