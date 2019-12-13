import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar } from './Components'

function ReviewOperator() {
  const { id } = useParams()
  const [auth, setAuth] = React.useState(0)
  const [data, setData] = React.useState({
    report: '',
    remark: ''
  })
  const [dataDoc, setDataDoc] = React.useState(0)

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
      setDataDoc(res.content)
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!!!data.report || !!!data.remark) {
      window.alert('请完整填写所需信息')
      return
    }
    const body = data
    body.operator = auth.name
    body.operator_id = auth.id
    body.date = moment().format('YYYY-MM-DD')
    body.time = moment().format('HH:mm:ss')
    body.id = id
    body.progress = '调度销记'
    // 1, 4->班组->Qc
    // 2, 3->工长->Qc->Pjsy
    // 工长 > 班组 -> Qc -> Pjsy
    if (dataDoc.detail2.value.length > 2 || dataDoc.detail3.value.length > 2) body.progress = '工长销记'
    else if (dataDoc.detail1.value.length > 2 || dataDoc.detail4.value.length > 2) body.progress = '班组销记'

    if (dataDoc.detail1.value.length > 2) {
      const detail1 = JSON.parse(dataDoc.detail1.value)
      let list = detail1.carriage.concat()
      list.forEach(it => {
        it.time_end = body.time
      })
      let response = await fetch(`/api/cheliang/004/${id}/detail/1`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({detail1: JSON.stringify(Object.assign(detail1, {carriage: list}))})
      })
      let res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
    }

    if (dataDoc.detail4.value.length > 2) {
      const detail4 = JSON.parse(dataDoc.detail4.value)
      let list = detail4.carriage.concat()
      list.forEach(it => it.time_end = body.time)
      const response = await fetch(`/api/cheliang/004/${id}/detail/4`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({detail4: JSON.stringify(Object.assign(detail4, {carriage: list}))})
      })
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
    }

    const res = await axios.put(`/api/cheliang/004/${id}/review/operator`, body)
    if (res.data.message) {
      window.alert(res.data.message)
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
            <h2>一体化作业申请单 - 作业负责人销记</h2>
            <hr />
            <Toolbar />
            <div className="card shadow mt-2 mb-5">
              <div className="card-header">
                <div className="btn-group">
                  <a href={`#车辆专业/004/${id}/作业负责人销记/1`} className="btn btn-sm btn-outline-info">
                    一般部件普查记录单
                  </a>

                  <a href={`#车辆专业/004/${id}/作业负责人销记/2`} className="btn btn-sm btn-outline-info">
                    一般配件更换记录表
                  </a>

                  <a href={`#车辆专业/004/${id}/作业负责人销记/3`} className="btn btn-sm btn-outline-info">
                    关键配件更换记录表
                  </a>

                  <a href={`#车辆专业/004/${id}/作业负责人销记/4`} className="btn btn-sm btn-outline-info">
                    加装改造（软件升级）记录单
                  </a>
                </div>
              </div>

              <div className="card-body">
                <div className="form-group">
                  <label>作业完成情况</label>
                  <input type="text" name="report" value={data.report || ''}
                      className="form-control"
                      onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>备注</label>
                  <input type="text" name="remark" value={data.remark || ''}
                      className="form-control"
                      onChange={handleChange} />
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-secondary"
                      onClick={() => {window.history.go(-1)}}>
                    <i className="fa fa-fw fa-arrow-left"></i>
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

export default ReviewOperator
