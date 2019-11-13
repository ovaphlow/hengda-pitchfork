import React from 'react'

export const SideNav = props => {
  return (
    <div className="list-group">
      <h6 className="text-info text-center mt-2">劳卫部</h6>

      <a href="#综合管理/001"
          className={`list-group-item list-group-item-action ${props.category === '001' ? 'active' : ''}`}
      >
        劳动定额工时统计台帐
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#综合管理/002"
          className={`list-group-item list-group-item-action ${props.category === '002' ? 'active' : ''}`}
      >
        食堂日常视频安全检查考核记录
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#综合管理/003"
          className={`list-group-item list-group-item-action ${props.category === '003' ? 'active' : ''}`}
      >
        沿线伙食团食品安全管理自查表
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <h6 className="text-info text-center mt-2">物资部</h6>

      <a href="#综合管理/004"
          className={`list-group-item list-group-item-action ${props.category === '004' ? 'active' : ''}`}
      >
        设备包机人名单
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#综合管理/005"
          className={`list-group-item list-group-item-action ${props.category === '005' ? 'active' : ''}`}
      >
        设备点检、运转记录卡
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#综合管理/006"
          className={`list-group-item list-group-item-action ${props.category === '006' ? 'active' : ''}`}
      >
        设备巡回检查记录簿
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#综合管理/007"
          className={`list-group-item list-group-item-action ${props.category === '007' ? 'active' : ''}`}
      >
        设备检修单
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <h6 className="text-info text-center mt-2">企法部</h6>

      <a href="#综合管理/008"
          className={`list-group-item list-group-item-action ${props.category === '008' ? 'active' : ''}`}
      >
        会议记录簿
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>
    </div>
  )
}
