import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { Title, Navbar, TrainPicker } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, TableDetail1 } from './Components'

function SaveDetail1() {
  const { id } = useParams()
  const [auth, setAuth] = React.useState({})
  const [document, setDocument] = React.useState({})
  const [data, setData] = React.useState({
    subject: '',
    approval: '',
    train: '',
    date: moment().format('YYYY-MM-DD'),
    carriage: []
  })
  const [dataDetail, setDataDetail] = React.useState({
    carriage_subject: '',
    time_begin: '',
    time_end: '',
    result: '',
    report: '',
    dept: '',
    operator: '',
    remark: ''
  })

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) return
    setAuth(a)
  }, [])

  React.useEffect(() => {
    const fetchDocument = async id => {
      const response = await fetch(`/api/cheliang/004/${id}`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDocument(JSON.parse(res.content.detail1.value))
    }
    fetchDocument(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleChangeDetail = e => {
    const { value, name } = e.target
    setDataDetail(prev => ({ ...prev, [name]: value }))
  }

  const handlePushList = event => {
    let carriage = data.carriage
    const detail = {carriage: event.target.value}
    if (event.target.checked) {
      carriage.push(detail)
    } else {
      carriage.splice(carriage.indexOf(detail), 1)
    }
    setData(prev => ({ ...prev, 'carriage': carriage }))
  }

  const handleSave = async () => {
    const carriage = data.carriage
    for (let i = 0; i < carriage.length; i++) {
      Object.assign(carriage[i], dataDetail)
    }
    const response = await fetch(`/api/cheliang/004/${id}/detail/1`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
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
            <div className="card shadow mt-2 mb-2">
              <div className="card-header">
                一般部件普查记录单
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>普查项目</label>
                      <input type="text" name="subject" value={data.subject || ''}
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>批准文件号</label>
                      <input type="text" name="approval" value={data.approval || ''}
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <TrainPicker caption="车组" name="train" value={data.train || ''}
                        handleChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>实施普查日期</label>
                      <input type="date" name="date" value={data.date || ''}
                          className="form-control"
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>车厢号</label>
                      <br />
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_01" value="01"
                            className="form-check-input" id="carriage-01"
                            onChange={handlePushList}
                        />
                        <label htmlFor="carriage-01" className="form-check-label">01</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_02" value="02"
                            className="form-check-input" id="carriage-02"
                            onChange={handlePushList}
                        />
                        <label htmlFor="carriage-02" className="form-check-label">02</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_03" value="03"
                            className="form-check-input" id="carriage-03"
                            onChange={handlePushList}
                        />
                        <label htmlFor="carriage-03" className="form-check-label">03</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_04" value="04"
                            className="form-check-input" id="carriage-04"
                            onChange={handlePushList}
                        />
                        <label htmlFor="carriage-04" className="form-check-label">04</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_05" value="05"
                            className="form-check-input" id="carriage-05"
                            onChange={handlePushList}
                        />
                        <label htmlFor="carriage-05" className="form-check-label">05</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_06" value="06"
                            className="form-check-input" id="carriage-06"
                            onChange={handlePushList}
                        />
                        <label htmlFor="carriage-06" className="form-check-label">06</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_07" value="07"
                            className="form-check-input" id="carriage-07"
                            onChange={handlePushList}
                        />
                        <label htmlFor="carriage-07" className="form-check-label">07</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_08" value="08"
                            className="form-check-input" id="carriage-08"
                            onChange={handlePushList}
                        />
                        <label htmlFor="carriage-08" className="form-check-label">08</label>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>具体项点</label>
                      <input type="text" name="carriage_subject" value={dataDetail.carriage_subject || ''}
                          className="form-control"
                          onChange={handleChangeDetail}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>开工时间</label>
                      <input type="time" name="time_begin" value={dataDetail.time_begin || ''}
                          className="form-control" readOnly
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>
                        完工时间
                        <span className="badge badge-danger">销记后系统自动修改完工时间</span>
                      </label>
                      <input type="time" name="time_end" value={dataDetail.time_end || ''}
                          className="form-control" readOnly
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>检查结果</label>
                      <input type="text" name="result" value={dataDetail.result || ''}
                          className="form-control"
                          onChange={handleChangeDetail}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>故障及处理情况</label>
                      <input type="text" name="report" value={dataDetail.report || ''}
                          className="form-control"
                          onChange={handleChangeDetail}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>实施单位</label>
                      <input type="text" name="dept" value={dataDetail.dept || ''}
                          className="form-control"
                          onChange={handleChangeDetail}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>实施者</label>
                      <input type="text" name="operator" value={dataDetail.operator || ''}
                          className="form-control"
                          onChange={handleChangeDetail}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>备注</label>
                  <input type="text" name="remark" value={dataDetail.remark || ''}
                      className="form-control"
                      onChange={handleChangeDetail}
                  />
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-secondary btn-sm"
                    onClick={() => window.history.go(-1)}
                  >
                    返回
                  </button>
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleSave}>
                    <i className="fa fa-fw fa-plus"></i>
                    新增记录
                  </button>
                </div>
              </div>
            </div>

            {document.id && (
              <TableDetail1 data={document} auth={auth} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SaveDetail1