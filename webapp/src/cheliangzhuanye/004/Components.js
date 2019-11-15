import React from 'react'

export function Toolbar() {
  return (
    <>
      <div className="btn-group">
        <a href="/车辆专业/004/上传" className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-upload"></i>
          上传作业计划
        </a>

        <a href="/车辆专业/004/新增" className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>

        <a href="/车辆专业/004/新增计划外" className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增计划外申请
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href="/车辆专业/004/check" className="btn btn-sm btn-outline-info">
          <i className="fa fa-fw fa-list"></i>
          审核
          &nbsp;<span class="badge badge-pill badge-danger">0</span>
        </a>

        <a href="/车辆专业/004/review" className="btn btn-sm btn-outline-info">
          <i className="fa fa-fw fa-list"></i>
          销记
          &nbsp;<span class="badge badge-pill badge-danger">0</span>
        </a>

        <a href="/车辆专业/004/stats" className="btn btn-sm btn-outline-primary">
          <i className="fa fa-fw fa-pie-chart"></i>
          统计
        </a>

        <a href="/车辆专业/004" className="btn btn-sm btn-outline-secondary">
          <i className="fa fa-fw fa-list"></i>
          列表
        </a>
      </div>

      <div className="clearfix"></div>
    </>
  )
}
