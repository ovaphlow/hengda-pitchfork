import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import { Title, Navbar, TeamPicker } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar } from './Components'

function CheckPjsy() {
  const { id } = useParams()
  const [auth, setAuth] = React.useState(0)
  const [data, setData] = React.useState({
    comment: '',
    team: '',
    qc: ''
  })

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) {
      window.location = '#登录'
      return
    }
    setAuth(a)
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))

    if (e.target.name !== 'comment') return
    const team = document.querySelector('select[name="team"]')
    if (e.target.value === '无要求') {
      team.setAttribute('readonly', true)
      setData(prev => ({ ...prev, 'team': ''}))
      setData(prev => ({ ...prev, 'qc': ''}))
    } else if (e.target.value === '班组跟踪、质检确认') {
      team.removeAttribute('readonly')
      setData(prev => ({ ...prev, 'qc': ''}))
    } else if (e.target.value === '班组、质检跟踪') {
      team.removeAttribute('readonly')
      setData(prev => ({ ...prev, 'qc': '质检'}))
    }
  }

  const handleSubmit = async () => {
    if (!!!data.comment) {
      window.alert('请选择作业形式')
      return
    }
    if (data.comment.indexOf('班组') >= 0 && !!!data.team) {
      window.alert('请选择班组')
      return
    }
    let body = data
    body.p_jsy = auth.name
    body.p_jsy_id = auth.id
    body.date = moment().format('YYYY-MM-DD')
    body.time = moment().format('HH:mm:ss')
    const res = await axios.put(`/api/cheliang/004/${id}/check/p_jsy`, body)
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
            <h2>一体化作业申请单 - 技术员审核</h2>
            <hr />
            <Toolbar />
            <div className="card shadow mt-2 mb-5">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>作业形式</label>
                      <select name="comment" value={data.comment}
                          className="form-control"
                          onChange={handleChange}>
                        <option value="">未选择</option>
                        <option value="无要求">无要求</option>
                        <option value="班组跟踪、质检确认">班组跟踪、质检确认</option>
                        <option value="班组、质检跟踪">班组、质检跟踪</option>
                      </select>
                    </div>
                  </div>

                  <div className="col">
                    <TeamPicker caption="班组" name="team" value={data.team || ''}
                        handleChange={handleChange} />
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>质检</label>
                      <input type="text" name="qc" value={data.qc || ''} readOnly={true}
                          className="form-control"
                          onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-secondary"
                      onClick={() => window.history.go(-1)}>
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

export default CheckPjsy
