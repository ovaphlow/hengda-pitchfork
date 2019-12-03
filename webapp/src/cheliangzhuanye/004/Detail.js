import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, Form } from './Components'

function Detail() {
  const { id } = useParams()
  const [auth, setAuth] = React.useState(0)
  const [data, setData] = React.useState(0)

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) {
      window.location = `#登录`
      return
    }
    setAuth(a)
  }, [])

  React.useEffect(() => {
    const fetchData = async id => {
      const res = await axios.get(`/api/cheliang/004/${id}`)
      if (res.data.message) {
        window.alert(res.data.message)
        return
      }
      setData(res.data.content)
      console.info(res.data)
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReject = async () => {
    const content = window.prompt('请输入驳回原因')
    if (!!!content) return
    const res = await axios.put(`/api/cheliang/004/${data.id}/reject`, {
      id: data.id,
      reject: content
    })
    if (res.data.message) {
      window.alert(res.data.message)
      return
    }
    window.location = '#车辆专业/004'
  }

  const handleCheckPdd = async () => {
    const body = {
      p_dd: auth.name,
      p_dd_id: auth.id,
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm:ss')
    }
    const res = await axios.put(`/api/cheliang/004/${id}/check/p_dd`, body)
    if (res.data.message) {
      window.alert(res.data.message)
      return
    }
    window.location.reload(true)
  }

  const handleCheckPzbsz = async () => {
    const body = {
      p_zbsz: auth.name,
      p_zbsz_id: auth.id,
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm:ss')
    }
    const res = await axios.put(`/api/cheliang/004/${id}/check/p_zbsz`, body)
    if (res.data.message) {
      window.alert(res.data.message)
      return
    }
    window.location.reload(true)
  }

  const handleCheckTeam = async () => {
    const body = { team_id: auth.id }
    const res = await axios.put(`/api/cheliang/004/${id}/check/team`, body)
    if (res.data.message) {
      window.alert(res.data.message)
      return
    }
    window.location.reload(true)
  }

  const handleCheckQc = async () => {
    const body = { qc_id: auth.id }
    const res = await axios.put(`/api/cheliang/004/${id}/check/qc`, body)
    if (res.data.message) {
      window.alert(res.data.message)
      return
    }
    window.location.reload(true)
  }

  const handleReviewPdd = async () => {
    window.alert('调度销记')
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
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary"
                      onClick={() => window.close()}>
                    <i className="fa fa-fw fa-window-close-o"></i>
                    关闭
                  </button>
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-sm btn-outline-success">
                    <i className="fa fa-fw fa-history"></i>
                    操作记录
                  </button>

                  <button type="button" className="btn btn-sm btn-outline-info">
                    <i className="fa fa-fw fa-download"></i>
                    下载Excel
                  </button>
                </div>
              </div>

              <div className="card-body">
                <Form mode="read" data={data} />
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  {!!!data.reject && (
                    <button type="button" className="btn btn-outline-danger" onClick={handleReject}>
                      <i className="fa fa-fw fa-mail-reply"></i>
                      驳回
                    </button>
                  )}
                </div>

                <div className="btn-group pull-right">
                  {!!!data.reject && (
                    data.check_p_jsy_id === 0 && (
                      <button type="button" className="btn btn-primary"
                          onClick={() => window.location = `#车辆专业/004/${data.id}/技术员审核`}>
                        <i className="fa fa-fw fa-link"></i>
                        技术员审核
                      </button>
                    )
                  )}

                  {!!!data.reject && (
                    data.check_p_jsy_id > 0 && data.check_p_dd_id === 0 && (
                      <button type="button" className="btn btn-primary" onClick={handleCheckPdd}>
                        <i className="fa fa-fw fa-check"></i>
                        调度审核
                      </button>
                    )
                  )}

                  {!!!data.reject && (
                    data.check_p_dd_id > 0 && data.check_p_zbsz_id === 0 && (
                      <button type="button" className="btn btn-primary" onClick={handleCheckPzbsz}>
                        <i className="fa fa-fw fa-check"></i>
                        值班所长审核
                      </button>
                    )
                  )}

                  {!!!data.reject && (
                    data.check_p_zbsz_id > 0 && data.check_p_jsy_comment.indexOf('班组') >= 0 &&
                        data.check_team_id === 0 && (
                      <button type="button" className="btn btn-primary" onClick={handleCheckTeam}>
                        <i className="fa fa-fw fa-check"></i>
                        班组签字
                      </button>
                    )
                  )}

                  {!!!data.reject && (
                    data.check_p_zbsz_id > 0 && data.check_p_jsy_comment.indexOf('质检跟踪') >= 0 &&
                        data.check_qc_id === 0 && (
                      <button type="button" className="btn btn-primary" onClick={handleCheckQc}>
                        <i className="fa fa-fw fa-check"></i>
                        质检签字
                      </button>
                    )
                  )}

                  {!!!data.reject && (
                    data.check_p_zbsz_id > 0 && data.review_operator_id === 0 &&
                        (
                          (data.check_p_jsy_comment === '无要求') ||
                          (data.check_p_jsy_comment === '班组跟踪、质检确认' && data.check_team_id > 0) ||
                          (data.check_p_jsy_comment === '班组、质检跟踪' && data.check_team_id > 0 && data.check_qc_id > 0)
                        ) && (
                      <button type="button" className="btn btn-primary"
                          onClick={() => window.location = `#车辆专业/004/${data.id}/作业负责人销记`}>
                        <i className="fa fa-fw fa-link"></i>
                        作业负责人销记
                      </button>
                    )
                  )}

                  {!!!data.reject && (
                    data.review_operator_id > 0 && data.review_p_gz_id === 0 && (
                      <button type="button" className="btn btn-primary"
                          onClick={() => window.location = `#车辆专业/004/${data.id}/工长销记`}>
                        <i className="fa fa-fw fa-link"></i>
                        工长销记
                      </button>
                    )
                  )}

                  {!!!data.reject && (
                    data.review_p_gz_id > 0 && data.review_p_jsy_id === 0 && (
                      <button type="button" className="btn btn-primary"
                          onClick={() => window.location = `#车辆专业/004/${data.id}/技术员销记`}>
                        <i className="fa fa-fw fa-link"></i>
                        技术员销记
                      </button>
                    )
                  )}

                  {!!!data.reject && (
                    data.review_p_jsy_id > 0 && data.review_p_dd_id === 0 && (
                      <button type="button" className="btn btn-primary" onClick={handleReviewPdd}>
                        <i className="fa fa-fw fa-link"></i>
                        调度销记
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail