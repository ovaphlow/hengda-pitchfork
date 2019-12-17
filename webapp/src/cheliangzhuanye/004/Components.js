import React from 'react'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/zh-cn'

import { TrainPicker } from '../../Components'

export function Toolbar() {
  const [qty, setQty] = React.useState(0)

  React.useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return

    const fetchQtyPjsy = async () => {
      const response = await fetch(`/api/cheliang/004/to-do/p_jsy/qty`)
      const res = await response.json()
      setQty(prev => prev + res.content.qty)
    }
    const fetchQtyPdd = async () => {
      const response = await fetch(`/api/cheliang/004/to-do/p_dd/qty`)
      const res = await response.json()
      setQty(prev => prev + res.content.qty)
    }
    const fetchQtyPzbsz = async () => {
      const response = await fetch(`/api/cheliang/004/to-do/p_zbsz/qty`)
      const res = await response.json()
      setQty(prev => prev + res.content.qty)
    }
    const fetchQtyTeam = async () => {
      const response = await fetch(`/api/cheliang/004/to-do/team/${auth.master_id}/qty`)
      const res = await response.json()
      setQty(prev => prev + res.content.qty)
    }
    const fetchQtyQc = async () => {}
    const fetchQtyUser = async id => {
      const response = await fetch(`/api/cheliang/004/to-do/user/${id}/qty`)
      const res = await response.json()
      setQty(prev => prev + res.content.qty)
    }
    if (auth.p_jsy === 1) {
      fetchQtyPjsy()
    }
    if (auth.p_dd === 1) {
      fetchQtyPdd()
    }
    if (auth.p_zbsz === 1) {
      fetchQtyPzbsz()
    }
    if (auth.dept_mark === '班组') fetchQtyTeam()
    if (auth.dept_mark === '质检') {
      console.info('qty-qc')
    }
    fetchQtyUser(auth.id)
  }, [])

  return (
    <>
      <div className="btn-group">
        <a href="#车辆专业/004/上传作业计划" className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-upload"></i>
          上传作业计划
        </a>

        <a href="#车辆专业/004/新增" className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增申请
        </a>

        <a href="#车辆专业/004/新增计划外" className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增计划外申请
        </a>
      </div>

      <div className="btn-group pull-right">
        {/*
        <a href="#车辆专业/004/审核" className="btn btn-sm btn-outline-info">
          <i className="fa fa-fw fa-list"></i>
          审核
          &nbsp;<span className="badge badge-pill badge-danger">{qty || '0'}</span>
        </a>

        <a href="#车辆专业/004/销记" className="btn btn-sm btn-outline-info">
          <i className="fa fa-fw fa-list"></i>
          销记
          &nbsp;<span className="badge badge-pill badge-danger">0</span>
        </a>
        */}

        <a href="#车辆专业/004/统计" className="btn btn-sm btn-outline-primary">
          <i className="fa fa-fw fa-pie-chart"></i>
          统计
        </a>

        <a href="#车辆专业/004/已驳回申请" className="btn btn-sm btn-outline-danger">
          <i className="fa fa-fw fa-pie-chart"></i>
          已驳回申请
        </a>

        <a href="#车辆专业/004/待处理申请" className="btn btn-sm btn-outline-info">
          <i className="fa fa-fw fa-list"></i>
          待处理申请
          &nbsp;<span className="badge badge-pill badge-danger">{qty}</span>
        </a>

        <a href="#车辆专业/004" className="btn btn-sm btn-outline-secondary">
          <i className="fa fa-fw fa-list"></i>
          列表
        </a>
      </div>

      <div className="clearfix"></div>
    </>
  )
}

export function Form(props) {
  return (
    <>
      <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
        <tbody>
          <tr>
            <td rowSpan="2" width="20%" className="text-center align-middle">CRH</td>
            <td><strong>乌鲁木齐车辆段</strong></td>
            <td width="15%"></td>
          </tr>
          <tr>
            <td colSpan="2"><strong>一体化作业申请单</strong></td>
          </tr>
        </tbody>
      </table>

      <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
        <tbody>
          <tr>
            <td width="15%" className="text-center align-middle">申请单位</td>
            <td colSpan="3" className="text-center align-middle">
              {props.mode === 'read' ?
                <span>{props.data.dept}</span>
                :
                <input type="text" className="form-control" id="dept"
                    readOnly={true}
                    defaultValue={props.data.dept || ''}
                />
              }
            </td>
          </tr>
          <tr>
            <td width="15%" className="text-center align-middle">申请人</td>
            <td width="35%" className="text-center align-middle">
              {
                props.mode === 'read' ?
                  (
                    <span>{props.data.leader}</span>
                  ) : (
                    <input type="text" name="leader" value={props.data.leader || ''}
                        className="form-control"
                        readOnly={props.mode === 'read' ? true : false}
                        onChange={props.handleChange}
                    />
                  )
              }
            </td>
            <td width="15%" className="text-center align-middle">联系电话</td>
            <td width="35%" className="text-center align-middle">
              {
                props.mode === 'read' ? (
                  <span>{props.data.leader_phone}</span>
                ) : (
                  <input type="text" name="leader_phone" value={props.data.leader_phone || ''}
                      className="form-control"
                      readOnly={props.mode === 'read' ? true : false}
                      onChange={props.handleChange}
                  />
                )
              }
            </td>
          </tr>
          <tr>
            <td width="15%" className="text-center align-middle">作业负责人</td>
            <td width="35%" className="text-center align-middle">
              {
                props.mode === 'read' ? (
                  <span>{props.data.operator}</span>
                ) : (
                  <input type="text" name="operator" value={props.data.operator || ''}
                      className="form-control"
                      readOnly={true}
                      onChange={props.handleChange}
                  />
                )
              }
            </td>
            <td width="15%" className="text-center align-middle">联系电话</td>
            <td width="35%" className="text-center align-middle">
              {
                props.mode === 'read' ? (
                  <span>{props.data.operator_phone}</span>
                ) : (
                  <input type="text" name="operator_phone" value={props.data.operator_phone || ''}
                      className="form-control"
                      readOnly={props.mode === 'read' ? true : false}
                      onChange={props.handleChange}
                  />
                )
              }
            </td>
          </tr>
          <tr>
            <td width="15%" className="text-center align-middle">作业车组号</td>
            <td colSpan="3" className="text-center align-middle">
              {
                props.mode === 'read' ? (
                  <strong>{props.data.train}</strong>
                ) : (
                  <TrainPicker mode={props.mode} caption="" value={props.data.train || ''} handleChange={props.handleChange} />
                )
              }
            </td>
          </tr>
          <tr>
            <td width="15%" className="text-center align-middle">申请作业时间</td>
            <td colSpan="3" className="text-center">
              <div className="row">
                <div className="col">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">开始日期</div>
                    </div>
                    <input type="date" name="date_begin" value={props.data.date_begin || ''}
                        readOnly={props.mode === 'read' ? true : false}
                        className="form-control"
                        onChange={props.handleChange}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">时间</div>
                    </div>
                    <input type="time" name="time_begin" value={props.data.time_begin || ''}
                        readOnly={props.mode === 'read' ? true : false}
                        className="form-control"
                        onChange={props.handleChange}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">结束日期</div>
                    </div>
                    <input type="date" name="date_end" value={props.data.date_end || ''}
                        readOnly={props.mode === 'read' ? true : false}
                        className="form-control"
                        onChange={props.handleChange}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">时间</div>
                    </div>
                    <input type="time" name="time_end" value={props.data.time_end || ''}
                        readOnly={props.mode === 'read' ? true : false}
                        className="form-control"
                        onChange={props.handleChange}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td width="15%" className="text-center align-middle">作业内容</td>
            <td colSpan="3" className="text-center align-middle">
              {
                props.mode === 'read' ? (
                  <span>{props.data.title}</span>
                ) : (
                  <select name="title" value={props.data.title}
                      className="form-control form-control-sm"
                      disabled={props.mode === 'read' ? true : false}
                      onChange={props.handleChange}
                  >
                    <option value="普查">普查</option>
                    <option value="检查">检查</option>
                    <option value="故障处理">故障处理</option>
                    <option value="加装改造">加装改造</option>
                    <option value="其它">其它</option>
                  </select>
                )
              }
              <br />
              {
                props.mode === 'read' ? (
                  <span>{props.data.content}</span>
                ) : (
                  <input type="text" name="content" value={props.data.content}
                      className="form-control form-control-sm"
                      readOnly={props.mode === 'read' ? true : false}
                      onChange={props.handleChange}
                  />
                )
              }
            </td>
          </tr>
          <tr>
            <td width="15%" className="text-center align-middle">施修要求</td>
            <td colSpan="3">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td width="15%" className="text-center">蓄电池</td>
                    <td className="text-center">
                      {
                        props.mode === 'read' ? (
                          <span>
                            {
                              props.data.p_yq_xdc === '供' ? (
                                <span className="text-danger">
                                  <strong>✓供</strong>
                                </span>
                              ) : (
                                <span>▢供</span>
                              )
                            }
                          </span>
                        ) : (
                          <span>
                            <input type="radio" name="p_yq_xdc" value="供" id="p_yq_xdc_0"
                                disabled={props.mode === 'read' ? true : false}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="p_yq_xdc-0">供</label>
                          </span>
                        )
                      }
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      {
                        props.mode === 'read' ? (
                          <span>
                            {
                              props.data.p_yq_xdc === '断' ? (
                                <span className="text-danger">
                                  <strong>✓断</strong>
                                </span>
                              ) : (
                                <span>▢断</span>
                              )
                            }
                          </span>
                        ) : (
                          <span>
                            <input type="radio" name="p_yq_xdc" value="断" id="p_yq_xdc-1"
                                disabled={props.mode === 'read' ? true : false}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="p_yq_xdc-1">断</label>
                          </span>
                        )
                      }
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      {
                        props.mode === 'read' ? (
                          <span>
                            {
                              props.data.p_yq_xdc === '无要求' ? (
                                <span className="text-danger">
                                  <strong>✓无要求</strong>
                                </span>
                              ) : (
                                <span>▢无要求</span>
                              )
                            }
                          </span>
                        ) : (
                          <span>
                            <input type="radio" name="p_yq_xdc" value="无要求" id="p_yq_xdc-2"
                                disabled={props.mode === 'read' ? true : false}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="p_yq_xdc-2">无要求</label>
                          </span>
                        )
                      }
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td width="15%" className="text-center">接触网</td>
                    <td className="text-center">
                      {
                        props.mode === 'read' ? (
                          <span>
                            {
                              props.data.p_yq_jcw === '供' ? (
                                <span className="text-danger">
                                  <strong>✓供</strong>
                                </span>
                              ) : (
                                <span>▢供</span>
                              )
                            }
                          </span>
                        ) : (
                          <span>
                            <input type="radio" name="p_yq_jcw" value="供" id="p_yq_jcw-0"
                                disabled={props.mode === 'read' ? true : false}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="p_yq_jcw-0">供</label>
                          </span>
                        )
                      }
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      {
                        props.mode === 'read' ? (
                          <span>
                            {
                              props.data.p_yq_jcw === '断' ? (
                                <span className="text-danger">
                                  <strong>✓断</strong>
                                </span>
                              ) : (
                              <span>▢断</span>
                              )
                            }
                          </span>
                        ) : (
                          <span>
                            <input type="radio" name="p_yq_jcw" value="断" id="p_yq_jcw-1"
                                disabled={props.mode === 'read' ? true : false}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="p_yq_jcw-1">断</label>
                          </span>
                        )
                      }
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      {
                        props.mode === 'read' ? (
                          <span>
                            {
                              props.data.p_yq_jcw === '无要求' ? (
                                <span className="text-danger">
                                  <strong>✓无要求</strong>
                                </span>
                              ) : (
                                <span>▢无要求</span>
                              )
                            }
                          </span>
                        ) : (
                          <span>
                            <input type="radio" name="p_yq_jcw" value="无要求" id="p_yq_jcw-2"
                                disabled={props.mode === 'read' ? true : false}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="p_yq_jcw-2">无要求</label>
                          </span>
                        )
                      }
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td width="15%" className="text-center">作业地点</td>
                    <td className="text-center">
                      {
                        props.mode === 'read' ? (
                          <span>
                            {
                              props.data.p_yq_zydd === '检查库' ? (
                                <span className="text-danger">
                                  <strong>✓检查库</strong>
                                </span>
                              ) : (
                                <span>▢检查库</span>
                              )
                            }
                          </span>
                        ) : (
                          <span>
                            <input type="radio" name="p_yq_zydd" value="检查库" id="p_yq_zydd-0"
                                disabled={props.mode === 'read' ? true : false}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="p_yq_zydd-0">检查库</label>
                          </span>
                        )
                      }
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      {
                        props.mode === 'read' ? (
                          <span>
                            {
                              props.data.p_yq_zydd === '临修库' ? (
                                <span className="text-danger">
                                  <strong>✓临修库</strong>
                                </span>
                              ) : (
                                <span>▢临修库</span>
                              )
                            }
                          </span>
                        ) : (
                          <span>
                            <input type="radio" name="p_yq_zydd" value="临修库" id="p_yq_zydd-1"
                                disabled={props.mode === 'read' ? true : false}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="p_yq_zydd-1">临修库</label>
                          </span>
                        )
                      }
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      {
                        props.mode === 'read' ? (
                          <span>
                            {
                              props.data.p_yq_zydd === '无要求' ? (
                                <span className="text-danger">
                                  <strong>✓无要求</strong>
                                </span>
                              ) : (
                                <span>▢无要求</span>
                              )
                            }
                          </span>
                        ) : (
                          <span>
                            <input type="radio" name="p_yq_zydd" value="无要求" id="p_yq_zydd-2"
                                disabled={props.mode === 'read' ? true : false}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="p_yq_zydd-2">无要求</label>
                          </span>
                        )
                      }
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td width="15%" className="text-center">其它</td>
                    <td className="text-center align-middle">
                      {
                        props.mode === 'read' ? (
                          <span>{props.data.p_yq_qt}</span>
                        ) : (
                          <input type="text" name="p_yq_qt" value={props.data.p_yq_qt}
                              className="form-control form-control-sm"
                              readOnly={props.mode === 'read' ? true : false}
                              onChange={props.handleChange}
                          />
                        )
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
        <tbody>
          <tr>
            <td width="15%" className="text-center align-middle">备注</td>
            <td>
              <span className="text-info">{props.data.check_p_jsy_comment}</span>
              <span className="text-secondary">
                （班组：{props.data.check_p_jsy_team} /
                质检：{props.data.check_p_jsy_qc}）
              </span>
              <br />
              {props.data.remark}
              <br />
              作业完成情况：{props.data.review_operator_report}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export function ListItem(props) {
  const calcTime = () => {
    moment.locale('zh-cn')
    let end_time = moment(`${props.data.date_end}T${props.data.time_end}`)
    let current = moment()
    if (moment(current).diff(end_time) > 0 && props.data.review_operator_id === 0) return (
      <span className="badge badge-danger">已超期 {moment(end_time).fromNow(true)}</span>
    )
    else if (moment(current).diff(end_time) > -900000 && props.data.review_operator_id === 0) return (
      <span className="badge badge-warning">预警 {moment(end_time).fromNow(true)}</span>
    )
  }

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除所选的数据？')) return
    const res = await axios.delete(`/api/cheliang/004/${props.data.id}`)
    if (res.data.message) {
      window.alert(res.data.message)
      return
    }
    window.location.reload(true)
  }

  return (
    <li className="list-group-item">
      <p className="lead">
        [{props.data.id}]
        {!!!props.data.reject && calcTime()}
        ({props.data.category})
        「<strong>{props.data.title}</strong>」
        {props.data.content}
        {props.data.reject ? (
          <span className="pull-right badge badge-danger">已驳回：{props.data.reject}</span>
        ) : (
          props.data.progress === '完结' ? (
            <span className="pull-right badge badge-secondary">{props.data.progress}</span>
          ) : (
            <span className="pull-right badge badge-info">{props.data.progress}</span>
          )
        )}
      </p>

      <ul className="list-inline">
        <li className="list-inline-item">
          <span className="text-secondary">申请单位：</span>
          {props.data.dept}
        </li>
        <li className="list-inline-item">
          <span className="text-secondary">申请人：</span>
          {props.data.leader} ({props.data.leader_phone})
        </li>
        <li className="list-inline-item">
          <span className="text-secondary">作业负责人：</span>
          {props.data.operator} ({props.data.operator_phone})
        </li>
        <li className="list-inline-item">
          <span className="text-secondary">作业车组号：</span>
          {props.data.train}
        </li>
        <li className="list-inline-item">
          <span className="text-secondary">申请作业时间：</span>
          {props.data.date_begin} {props.data.time_begin} 至 {props.data.date_end} {props.data.time_end}
        </li>
      </ul>

      <div className="row">
        <div className="col">
          {props.data.p_yq_xdc !== '无要求' &&
            <span className="badge badge-warning ml-1">蓄电池：{props.data.p_yq_xdc}</span>
          }
          {props.data.p_yq_jcw !== '无要求' &&
            <span className="badge badge-warning ml-1">接触网：{props.data.p_yq_jcw}</span>
          }
          {props.data.p_yq_zydd !== '无要求' &&
            <span className="badge badge-warning ml-1">作业地点：{props.data.p_yq_zydd}</span>
          }
        </div>
      </div>

      <div className="mt-3">
        <div className="btn-group">
          {
            props.auth.super === 1 && (
              <>
                <button type="button" className="btn btn-sm btn-outline-success"
                    onClick={() => window.open(`#车辆专业/004/${props.data.id}`)}>
                  <i className="fa fa-fw fa-edit"></i>
                  修改
                </button>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleRemove}>
                  删除
                </button>
              </>
            )
          }
        </div>

        <div className="btn-group pull-right">
          <button type="button" className="btn btn-sm btn-outline-info"
              onClick={() => window.open(`#车辆专业/004/${props.data.id}`)}>
            <i className="fa fa-fw fa-file-text-o"></i>
            详细信息
          </button>
        </div>
      </div>
    </li>
  )
}

export function TableDetail1(props) {
  return (
    <div className="card shadow">
      <div className="card-header">一般部件普查记录单</div>

      <div className="card-body table-responsive">
        <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
          <tbody>
            <tr>
              <td width="8%" className="text-center align-middle">普查项目</td>
              <td width="42%" colSpan="5" className="text-center align-middle">{props.dataHeader.subject}</td>
              <td width="15%" colSpan="2" className="text-center align-middle">批准文件号</td>
              <td width="35%" colSpan="4" className="text-center align-middle">{props.dataHeader.approval}</td>
            </tr>
            <tr>
              <td width="10%" className="text-center align-middle">实施普查车组</td>
              <td width="40%" colSpan="5" className="text-center align-middle">{props.dataHeader.train}</td>
              <td width="10%" colSpan="2" className="text-center align-middle">实施普查日期</td>
              <td width="40%" colSpan="4" className="text-center align-middle">{props.dataHeader.date}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
          <thead className="thead-light">
            <tr>
              <th width="8%" className="text-center align-middle">实施普查<br />的车厢号</th>
              <th width="10%" className="text-center align-middle">具体项点</th>
              <th width="6%" className="text-center align-middle">开工<br />时间</th>
              <th width="6%" className="text-center align-middle">完工<br />时间</th>
              <th width="6%" className="text-center align-middle">检查<br />结果</th>
              <th width="14%" className="text-center align-middle">故障及处理情况</th>
              <th width="8%" className="text-center align-middle">实施单位</th>
              <th width="7%" className="text-center align-middle">实施者</th>
              <th width="8%" className="text-center align-middle">动车组<br />现场监控人</th>
              <th width="8%" className="text-center align-middle">监控班组</th>
              <th width="8%" className="text-center align-middle">质检员</th>
              <th className="text-center align-middle">备注</th>
            </tr>
          </thead>

          <tbody>
            {props.dataList.map((it, i) => (
              <tr key={i}>
                <td width="8%" className="text-center align-middle">
                  <span className="pull-right">{it.carriage}</span>
                  {props.auth.id && (
                    <i className="fa fa-fw fa-trash text-danger" data-id={i} onClick={props.handleRemove}></i>
                  )}
                </td>
                <td width="10%" className="text-center align-middle">{it.carriage_subject}</td>
                <td width="6%" className="text-center align-middle">{it.time_begin}</td>
                <td width="6%" className="text-center align-middle">{it.time_end}</td>
                <td width="6%" className="text-center align-middle">{it.result}</td>
                <td width="14%" className="text-center align-middle">{it.report}</td>
                <td width="8%" className="text-center align-middle">{it.dept}</td>
                <td width="7%" className="text-center align-middle">{it.operator}</td>
                <td width="8%" className="text-center align-middle">
                  {it.watcher}
                  {props.mode === 'team' && (
                    <select className="form-control form-control-sm" data-id={i}
                      onChange={props.handleSubmit}
                    >
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                      <option value="未确认">未确认</option>
                    </select>
                  )}
                </td>
                <td width="8%" className="text-center align-middle">{it.team}</td>
                <td width="8%" className="text-center align-middle">
                  {it.qc}
                  {props.mode === 'qc' && (
                    <select className="form-control form-control-sm" data-id={i}
                      onChange={props.handleSubmitQc}
                    >
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                      <option value="未确认">未确认</option>
                    </select>
                  )}
                </td>
                <td className="text-center align-middle">{it.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function TableDetail2(props) {
  return (
    <div className="card shadow">
      <div className="card-header">
        一般配件更换记录表
        <span className="pull-right">
          <button type="button" className="btn btn-sm btn-outline-success">
            下载Excel
          </button>
        </span>
      </div>

      <div className="card-body table-responsive">
        <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
          <thead className="thead-light">
            <tr>
              <th width="6%" className="text-center align-middle">部件名称</th>
              <th width="6%" className="text-center align-middle">车组</th>
              <th width="3%" className="text-center align-middle">车号</th>
              <th width="3%" className="text-center align-middle">位置</th>
              <th width="6%" className="text-center align-middle">日期</th>
              <th width="6%" className="text-center align-middle">时间</th>
              <th className="text-center align-middle">更换原因</th>
              <th width="6%" className="text-center align-middle">作业人员已阅读工艺文件并掌握各步骤</th>
              <th width="4%" className="text-center align-middle">力矩扳手已校验</th>
              <th width="6%" className="text-center align-middle">换下部件序列号</th>
              <th width="6%" className="text-center align-middle">换上部件序列号</th>
              <th width="4%" className="text-center align-middle">部件安装良好，螺栓力矩已套固，防松标记已涂打</th>
              <th width="6%" className="text-center align-middle">作业者</th>
              <th width="6%" className="text-center align-middle">检修工长</th>
              <th width="4%" className="text-center align-middle">部件功能试验正常</th>
              <th width="6%" className="text-center align-middle">质检员</th>
              <th width="6%" className="text-center align-middle">值班干部</th>
            </tr>
          </thead>

          <tbody>
            {props.data.length > 0 && props.data.map((it, i) => (
              <tr key={i}>
                <td>
                  <span className="pull-right">{it.name}</span>
                  {props.auth.id > 0 && (
                    <i className="fa fa-fw fa-trash text-danger" data-id={i} onClick={props.handleRemove}></i>
                  )}
                </td>
                <td>{it.train}</td>
                <td>{it.carriage}</td>
                <td>{it.position}</td>
                <td>{it.date}</td>
                <td>{it.time}</td>
                <td>{it.reason}</td>
                <td>{it.p_gywj}</td>
                <td>{it.p_ljbs}</td>
                <td>{it.sn_original}</td>
                <td>{it.sn_new}</td>
                <td>{it.p_bjaz}</td>
                <td>{it.operator}</td>
                <td>
                  {it.leader}
                  {props.mode === 'leader' && (
                    <select className="form-control form-control-sm" data-id={i}
                      onChange={props.handleSubmitLeader}
                    >
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                      <option value="未确认">未确认</option>
                    </select>
                  )}
                </td>
                <td>
                  {it.p_bjgnsy}
                  {props.mode === 'qc' && (
                    <select className="form-control form-control-sm" data-id={i}
                      onChange={props.handleSubmitQc}
                    >
                      <option value="">部件功能是否正常</option>
                      <option value="是">是</option>
                      <option value="否">否</option>
                    </select>
                  )}
                </td>
                <td>{it.qc}</td>
                <td>
                  {it.p_jsy}
                  {props.mode === 'p_jsy' && (
                    <select className="form-control form-control-sm" data-id={i}
                      onChange={props.handleSubmitPjsy}
                    >
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                      <option value="未确认">未确认</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function TableDetail3(props) {
  return (
    <div className="card shadow">
      <div className="card-header">
        关键配件更换记录表
        <span className="pull-right">
          <button type="button" className="btn btn-sm btn-outline-success">
            下载Excel
          </button>
        </span>
      </div>

      <div className="card-body table-responsive">
        <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
          <thead className="thead-light">
            <tr>
              <th width="6%" className="text-center align-middle">部件名称</th>
              <th width="6%" className="text-center align-middle">车组</th>
              <th width="3%" className="text-center align-middle">车号</th>
              <th width="3%" className="text-center align-middle">位置</th>
              <th width="6%" className="text-center align-middle">日期</th>
              <th width="6%" className="text-center align-middle">时间</th>
              <th width="6%" className="text-center align-middle">生产日期</th>
              <th className="text-center align-middle">更换原因</th>
              <th width="6%" className="text-center align-middle">作业人员已阅读工艺文件并掌握各步骤</th>
              <th width="4%" className="text-center align-middle">力矩扳手已校验</th>
              <th width="6%" className="text-center align-middle">换下部件序列号</th>
              <th width="6%" className="text-center align-middle">换上部件序列号</th>
              <th width="4%" className="text-center align-middle">部件安装良好，螺栓力矩已套固，防松标记已涂打</th>
              <th width="6%" className="text-center align-middle">作业者</th>
              <th width="6%" className="text-center align-middle">检修工长</th>
              <th width="4%" className="text-center align-middle">部件功能试验正常</th>
              <th width="6%" className="text-center align-middle">质检员</th>
              <th width="6%" className="text-center align-middle">值班干部</th>
            </tr>
          </thead>

          <tbody>
            {props.data.length > 0 && props.data.map((it, i) => (
              <tr key={i}>
                <td>
                  {it.name}
                  {props.auth.id > 0 && (
                    <i className="fa fa-fw fa-trash text-danger" data-id={i} onClick={props.handleRemove}></i>
                  )}
                </td>
                <td>{it.train}</td>
                <td>{it.carriage}</td>
                <td>{it.position}</td>
                <td>{it.date}</td>
                <td>{it.time}</td>
                <td>{it.date_manu}</td>
                <td>{it.reason}</td>
                <td>{it.p_gywj}</td>
                <td>{it.p_ljbs}</td>
                <td>{it.sn_original}</td>
                <td>{it.sn_new}</td>
                <td>{it.p_bjaz}</td>
                <td>{it.operator}</td>
                <td>
                  {it.leader}
                  {props.mode === 'leader' && (
                    <select className="form-control form-control-sm" data-id={i}
                      onChange={props.handleSubmitLeader}
                    >
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                      <option value="未确认">未确认</option>
                    </select>
                  )}
                </td>
                <td>
                  {it.p_bjgnsy}
                  {props.mode === 'qc' && (
                    <select className="form-control form-control-sm" data-id={i}
                      onChange={props.handleSubmitQc}
                    >
                      <option value="">部件功能是否正常</option>
                      <option value="是">是</option>
                      <option value="否">否</option>
                    </select>
                  )}
                </td>
                <td>{it.qc}</td>
                <td>
                  {it.p_jsy}
                  {props.mode === 'p_jsy' && (
                    <select className="form-control form-control-sm" data-id={i}
                      onChange={props.handleSubmitPjsy}
                    >
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                      <option value="未确认">未确认</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function TableDetail4(props) {
  return (
    <div className="card shadow">
      <div className="card-header">
        加装改造（软件升级）记录单
        <span className="pull-right">
          <button type="button" className="btn btn-sm btn-outline-success">
            下载Excel
          </button>
        </span>
      </div>

      <div className="card-body table-responsive">
        <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
          <tbody>
            <tr>
              <td width="15%" className="text-center align-middle">实施改造项目(升级系统)</td>
              <td colSpan="8" className="text-center align-middle">{props.dataHeader.subject}</td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">软件版本号</td>
              <td width="10%" className="text-center align-middle">新</td>
              <td width="10%" className="text-center align-middle">{props.dataHeader.version}</td>
              <td width="10%" className="text-center align-middle">旧</td>
              <td width="10%" className="text-center align-middle">{props.dataHeader.version_original}</td>
              <td width="20%" colSpan="2" className="text-center align-middle">批准文件号</td>
              <td width="30%" colSpan="2" className="text-center align-middle">{props.dataHeader.approval}</td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">实施改造车组</td>
              <td width="40$" colSpan="4" className="text-center align-middle">{props.dataHeader.train}</td>
              <td width="20%" colSpan="2" className="text-center align-middle">实施改造日期</td>
              <td width="30%" colSpan="2" className="text-center align-middle">{props.dataHeader.date}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
          <thead className="thead-light">
            <tr>
              <th width="15%" className="text-center align-middle">实施改造的车厢号</th>
              <th width="10%" className="text-center align-middle">开工时间</th>
              <th width="10%" className="text-center align-middle">完工时间</th>
              <th width="10%" className="text-center align-middle">实施单位</th>
              <th width="10%" className="text-center align-middle">实施者</th>
              <th width="10%" className="text-center align-middle">动车所现场监控人</th>
              <th width="10%" className="text-center align-middle">监控班组</th>
              <th width="10%" className="text-center align-middle">质检员</th>
              <th width="15%" className="text-center align-middle">备注</th>
            </tr>
          </thead>

          <tbody>
            {props.dataList.length > 0 && props.dataList.map((it, i) => (
              <tr key={i}>
                <td>
                  <span className="pull-right">{it.carriage}</span>
                  <i className="fa fa-fw fa-trash-o text-danger" data-id={i} onClick={props.handleRemove}></i>
                </td>
                <td>{it.time_begin}</td>
                <td>{it.time_end}</td>
                <td>{it.dept}</td>
                <td>{it.operator}</td>
                <td>
                  {it.watcher}
                  {props.mode === 'team' && (
                    <select className="form-control form-control-sm" data-id={i}
                      onChange={props.handleSubmit}
                    >
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                      <option value="未确认">未确认</option>
                    </select>
                  )}
                </td>
                <td>{it.team}</td>
                <td>
                  {it.qc}
                  {props.mode === 'qc' && (
                    <select className="form-control form-control-sm" data-id={i}
                      onChange={props.handleSubmitQc}
                    >
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                      <option value="未确认">未确认</option>
                    </select>
                  )}
                </td>
                <td>{it.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}