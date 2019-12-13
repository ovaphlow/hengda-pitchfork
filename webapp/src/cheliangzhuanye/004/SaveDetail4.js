import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { Title, Navbar, TrainPicker } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, TableDetail4 } from './Components'

function SaveDetail4() {
  const { id } = useParams()
  const [auth, setAuth] = React.useState({})
  const [dataHeader, setDataHeader] = React.useState({
    subject: '',
    version: '',
    version_original: '',
    approval: '',
    train: '',
    date: moment().format('YYYY-MM-DD')
  })
  const [dataRow, setDataRow] = React.useState({
    time_begin: '',
    time_end: '',
    dept: '',
    operator: '',
    remark: ''
  })
  const [dataList, setDataList] = React.useState([])

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) return
    setAuth(a)
    setDataRow(prev => ({ ...prev, 'dept': a.dept, 'operator': a.name }))
  }, [])

  React.useEffect(() => {
    const fetchData = async id => {
      const response = await fetch(`/api/cheliang/004/${id}`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataHeader(prev => ({ ...prev, 'train': res.content.train }))
      setDataRow(prev => ({ ...prev, 'time_begin': res.content.time_begin }))
      setDataList(JSON.parse(res.content.detail4.value).carriage || [])
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeHeader = e => {
    const { value, name } = e.target
    setDataHeader(prev => ({ ...prev, [name]: value }))
  }

  const handleChangeRow = e => {
    const { value, name } = e.target
    setDataRow(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    let list = []
    const el = document.querySelectorAll('input[type="checkbox"]')
    for (let i = 0; i < el.length; i++) {
      if (el[i].checked) {
        list.push(Object.assign({carriage: el[i].value}, dataRow))
      }
    }
    const response = await fetch(`/api/cheliang/004/${id}/detail/4`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({detail4: JSON.stringify(Object.assign(dataHeader, {carriage: dataList.concat(list)}))})
    })
    const res = await response.json()
    if (res.message) {
      window.console.error(res.message)
      return
    }
    window.location.reload(true)
  }

  const handleRemove = async event => {
    if (!!!window.confirm('确定要删除所选数据？')) return
    let list = dataList.concat()
    list.splice(parseInt(event.target.getAttribute('data-id')), 1)
    const response = await fetch(`/api/cheliang/004/${id}/detail/4`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        detail4: list.length > 0 ? JSON.stringify(Object.assign(dataHeader, {carriage: list})) : '{}'
      })
    })
    const res = await response.json()
    if (res.message) {
      window.console.error(res.message)
      return
    }
    window.location.reload(true)
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
            <h2>一体化作业申请单 - 加装改造（软件升级）记录单</h2>
            <hr />
            <Toolbar />
            <div className="card shadow mt-2 mb-2">
              <div className="card-header">加装改造（软件升级）记录单</div>

              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>实施改造项目（升级系统）</label>
                      <input type="text" name="subject" value={dataHeader.subject || ''}
                        className="form-control"
                        onChange={handleChangeHeader}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>软件版本号（新）</label>
                      <input type="text" name="version" value={dataHeader.version || ''}
                        className="form-control"
                        onChange={handleChangeHeader}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>软件版本号（旧）</label>
                      <input type="text" name="version_original" value={dataHeader.version_original || ''}
                        className="form-control"
                        onChange={handleChangeHeader}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>批准文件号</label>
                      <input type="text" name="approval" value={dataHeader.approval || ''}
                        className="form-control"
                        onChange={handleChangeHeader}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <TrainPicker caption="实施改造车组" name="train" value={dataHeader.train || ''}
                      handleChange={handleChangeHeader}
                    />
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>实施改造日期</label>
                      <input type="date" name="date" value={dataHeader.date || ''}
                        className="form-control"
                        onChange={handleChangeHeader}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>车厢号</label>
                      <br />
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_01" value="01"
                            className="form-check-input" id="carriage-01"
                        />
                        <label htmlFor="carriage-01" className="form-check-label">01</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_02" value="02"
                            className="form-check-input" id="carriage-02"
                        />
                        <label htmlFor="carriage-02" className="form-check-label">02</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_03" value="03"
                            className="form-check-input" id="carriage-03"
                        />
                        <label htmlFor="carriage-03" className="form-check-label">03</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_04" value="04"
                            className="form-check-input" id="carriage-04"
                        />
                        <label htmlFor="carriage-04" className="form-check-label">04</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_05" value="05"
                            className="form-check-input" id="carriage-05"
                        />
                        <label htmlFor="carriage-05" className="form-check-label">05</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_06" value="06"
                            className="form-check-input" id="carriage-06"
                        />
                        <label htmlFor="carriage-06" className="form-check-label">06</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_07" value="07"
                            className="form-check-input" id="carriage-07"
                        />
                        <label htmlFor="carriage-07" className="form-check-label">07</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="checkbox" name="carriage_08" value="08"
                            className="form-check-input" id="carriage-08"
                        />
                        <label htmlFor="carriage-08" className="form-check-label">08</label>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>开工时间</label>
                      <input type="text" name="time_begin" value={dataRow.time_begin || ''}
                        className="form-control" readOnly
                        onChange={handleChangeRow}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>完工时间</label>
                      <input type="text" name="time_end" value={dataRow.time_end || ''}
                        className="form-control" readOnly
                        onChange={handleChangeRow}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>实施单位</label>
                      <input type="text" name="dept" value={dataRow.dept || ''}
                        className="form-control"
                        onChange={handleChangeRow}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>实施者</label>
                      <input type="text" name="operator" value={dataRow.operator || ''}
                        className="form-control"
                        onChange={handleChangeRow}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>备注</label>
                  <input type="text" name="remark" value={dataRow.remark || ''}
                    className="form-control"
                    onChange={handleChangeRow}
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

            <TableDetail4 dataList={dataList} dataHeader={dataHeader} auth={auth} handleRemove={handleRemove} />
          </div>
        </div>
      </div>
    </>
  )
}

export default SaveDetail4