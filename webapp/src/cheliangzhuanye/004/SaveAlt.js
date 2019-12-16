import React from 'react'
import axios from 'axios'
import moment from 'moment'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, Form } from './Components'

function SaveAlt() {
  const [data, setData] = React.useState({
    category: '计划外',
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
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!!!data.leader || !!!data.leader_phone || !!!data.train ||
        !!!data.date_begin || !!!data.time_begin || !!!data.date_end ||
        !!!data.time_end || !!!data.content || !!!data.p_yq_xdc ||
        !!!data.p_yq_jcw || !!!data.p_yq_zydd || !!!data.p_yq_qt
    ) {
      window.alert('请完整填写所需信息')
      return
    }
    const res = await axios.post(`/api/cheliang/004/`, data)
    if (res.data.message) {
      window.alert(res.data.message)
      return
    }
    window.location = '#车辆专业/004'
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
            <h2>一体化作业申请单 - 新增计划外申请</h2>
            <hr />
            <Toolbar />
            <div className="card shadow mt-2">
              <div className="card-body">
                <Form data={data} handleChange={handleChange} />
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

export default SaveAlt
