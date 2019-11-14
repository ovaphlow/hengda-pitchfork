import React from 'react'

export const SideNav = props => {
  return (
    <div className="list-group">
      <h6 className="text-info text-center mt-2">财务部（收入部）</h6>

      <a href="#车辆专业/001"
          className={`list-group-item list-group-item-action ${props.category === '001' ? 'active' : ''}`}
      >
        在用低值易耗品管理台帐
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <h6 className="text-info text-center mt-2">物资部</h6>

      <a href="#车辆专业/002"
          className={`list-group-item list-group-item-action ${props.category === '002' ? 'active' : ''}`}
      >
        物资需求申请计划暨消耗台帐
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <h6 className="text-info text-center mt-2">国铁集团</h6>

      <a href="#车辆专业/003"
          className={`list-group-item list-group-item-action ${props.category === '003' ? 'active' : ''}`}
      >
        物资需求申请计划表
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>
    </div>
  )
}
