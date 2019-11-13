import React from 'react'

export const SideNav = props => {
  return (
    <div className="list-group">
      <h6 className="text-info text-center mt-2">职培部</h6>

      <a href="#职工培训/001"
          className={`list-group-item list-group-item-action ${props.category === '001' ? 'active' : ''}`}
      >
        岗位业务学习、技能演练及培训记录
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#职工培训/002"
          className={`list-group-item list-group-item-action ${props.category === '002' ? 'active' : ''}`}
      >
        月度职工技术业务学习演练计划
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#职工培训/003"
          className={`list-group-item list-group-item-action ${props.category === '003' ? 'active' : ''}`}
      >
        考试成绩汇总表
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#职工培训/004"
          className={`list-group-item list-group-item-action ${props.category === '004' ? 'active' : ''}`}
      >
        岗位胜任能力动态评价表
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>
    </div>
  )
}
