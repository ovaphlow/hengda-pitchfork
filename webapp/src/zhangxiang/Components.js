import React from 'react'

export const SideNav = props => {
  return (
    <div className="list-group shadow">
      <h6 className="text-muted text-center mt-2">选择功能</h6>

      <a href="#帐项/1"
          className={`list-group-item list-group-item-action ${props.category === 'dept' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-sitemap"></i>
        功能1
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>
    </div>
  )
}
