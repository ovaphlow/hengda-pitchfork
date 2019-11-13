import React from 'react'

export const SideNav = props => {
  return (
    <div className="list-group">
      <h6 className="text-info text-center mt-2">安监室</h6>

      <a href="#安全/001"
          className={`list-group-item list-group-item-action ${props.category === '001' ? 'active' : ''}`}
      >
        特种设备运行记录
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#安全/002"
          className={`list-group-item list-group-item-action ${props.category === '002' ? 'active' : ''}`}
      >
        特种防护用品台帐
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <h6 className="text-info text-center mt-2">保卫部</h6>

      <a href="#安全/003"
          className={`list-group-item list-group-item-action ${props.category === '003' ? 'active' : ''}`}
      >
        反恐安防台帐
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#安全/004"
          className={`list-group-item list-group-item-action ${props.category === '004' ? 'active' : ''}`}
      >
        防火档案
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>
    </div>
  )
}
