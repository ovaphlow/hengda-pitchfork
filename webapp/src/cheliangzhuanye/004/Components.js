import React from 'react'

import { TrainPicker } from '../../Components'

export function Toolbar() {
  return (
    <>
      <div className="btn-group">
        <a href="#车辆专业/004/上传" className="btn btn-sm btn-outline-success">
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
        <a href="#车辆专业/004/check" className="btn btn-sm btn-outline-info">
          <i className="fa fa-fw fa-list"></i>
          审核
          &nbsp;<span className="badge badge-pill badge-danger">0</span>
        </a>

        <a href="#车辆专业/004/review" className="btn btn-sm btn-outline-info">
          <i className="fa fa-fw fa-list"></i>
          销记
          &nbsp;<span className="badge badge-pill badge-danger">0</span>
        </a>

        <a href="#车辆专业/004/stats" className="btn btn-sm btn-outline-primary">
          <i className="fa fa-fw fa-pie-chart"></i>
          统计
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
            <td><strong>哈尔滨动车段哈尔滨西动车组运用所</strong></td>
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
            <td width="35%" className="text-center">
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
            <td width="35%" className="text-center">
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
                  <TrainPicker mode={props.mode} value={props.data.train || ''} handleChange={props.handleChange} />
                )
              }
            </td>
          </tr>
          <tr>
            <td width="15%" className="text-center align-middle">申请作业时间</td>
            <td colSpan="3" className="text-center">
              <input type="date" name="date_begin" value={props.data.date_begin || ''}
                  readOnly={props.mode === 'read' ? true : false}
                  className="form-control-sm"
                  style={{ width: '12rem' }}
                  onChange={props.handleChange}
              />
              <input type="time" name="time_begin" value={props.data.time_begin || ''}
                  readOnly={props.mode === 'read' ? true : false}
                  className="form-control-sm ml-3"
                  style={{ width: '12rem' }}
                  onChange={props.handleChange}
              />
              &nbsp;---&nbsp;
              <input type="date" name="date_end" value={props.data.date_end || ''}
                  readOnly={props.mode === 'read' ? true : false}
                  className="form-control-sm"
                  style={{ width: '12rem' }}
                  onChange={props.handleChange}
              />
              <input type="time" name="time_end" value={props.data.time_end || ''}
                  readOnly={props.mode === 'read' ? true : false}
                  className="form-control-sm ml-3"
                  style={{ width: '12rem' }}
                  onChange={props.handleChange}
              />
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
    </>
  )
}
