import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { Title, Navbar, TrainPicker, CarriagePicker } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, TableDetail2 } from './Components'

function SaveDetail2() {
  const { id } = useParams()
  const [auth, setAuth] = React.useState(0)
  const [dataList, setDataList] = React.useState([])
  const [dataRow, setDataRow] = React.useState({
    name: '',
    train: '',
    carriage: '01',
    position: '',
    date: moment().format('YYYY-MM-DD'),
    time: '',
    reason: '',
    p_gywj: '',
    p_ljbs: '',
    sn_original: '',
    sn_new: '',
    p_bjaz: '',
    operator: ''
  })

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) return
    setAuth(a)
    setDataRow(prev => ({ ...prev, 'operator': a.name }))
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setDataRow(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    console.info(dataRow)
    let list = dataList
    list.push(JSON.stringify(dataRow))
    console.info(list)
    const response = await fetch(`/api/cheliang/004/${id}/detail/2`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({detail2: list})
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
              <div className="card-header">一般配件更换记录表</div>

              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>部件名称</label>
                      <input type="text" name="name" value={dataRow.name || ''}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <TrainPicker caption="车组" name="train" value={dataRow.train || ''}
                      handleChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <CarriagePicker caption="车厢" name="carriage" value={dataRow.carriage || ''}
                      handleChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>位置</label>
                      <input type="text" name="position" value={dataRow.position || ''}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>日期</label>
                      <input type="date" name="date" value={dataRow.date}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>时间</label>
                      <input type="text" name="time" value={dataRow.time || ''}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>更换原因</label>
                      <input type="text" name="reason" value={dataRow.reason || ''}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>工艺文件及步骤</label>
                      <select name="p_gywj" value={dataRow.p_gywj || '否'}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="是">已阅读并掌握</option>
                        <option value="否">未阅读并掌握</option>
                      </select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>力矩扳手</label>
                      <select name="p_ljbs" value={dataRow.p_ljbs || '否'}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="是">已校验</option>
                        <option value="否">未校验</option>
                      </select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>换下部件序列号</label>
                      <input type="text" name="sn_original" value={dataRow.sn_original || ''}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>换上部件序列号</label>
                      <input type="text" name="sn_new" value={dataRow.sn_new || ''}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>部件、螺栓力矩、防松标记</label>
                      <select name="p_bjaz" value={dataRow.p_bjaz || '否'}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="是">部件安装良好，螺栓力矩已紧固，防松标记已涂打</option>
                        <option value="否">否</option>
                      </select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>作业者</label>
                      <input type="text" name="operator" value={dataRow.operator || ''}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary"
                    onClick={() => window.history.go(-1)}
                  >返回</button>
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleSave}>
                    <i className="fa fa-fw fa-plus"></i>
                    新增记录
                  </button>
                </div>
              </div>
            </div>

            <TableDetail2 data={dataList} auth={auth} />
          </div>
        </div>
      </div>
    </>
  )
}

export default SaveDetail2