import React from 'react'

export const SideNav = props => {
  return (
    <div className="list-group">
      <h6 className="text-info text-center mt-2">选择功能</h6>

      <a href="#用户/用户信息"
          className={`list-group-item list-group-item-action ${props.category === 'info' ? 'active' : ''}`}
      >
        用户信息
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#用户/修改密码"
          className={`list-group-item list-group-item-action ${props.category === 'password' ? 'active' : ''}`}
      >
        修改密码
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#用户/设置签名"
          className={`list-group-item list-group-item-action ${props.category === 'signature' ? 'active' : ''}`}
      >
        设置签名
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>
    </div>
  )
}
