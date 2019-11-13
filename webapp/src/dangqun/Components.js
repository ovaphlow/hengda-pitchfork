import React from 'react'

export const SideNav = props => {
  return (
    <div className="list-group">
      <h6 className="text-info text-center mt-2">人事部（组织部）</h6>

      <a href="#党群/001"
          className={`list-group-item list-group-item-action ${props.category === '001' ? 'active' : ''}`}
      >
        乌党-5 党支部工作电子文档
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#党群/002"
          className={`list-group-item list-group-item-action ${props.category === '002' ? 'active' : ''}`}
      >
        乌党-9 党支部工作电子文档
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <h6 className="text-info text-center mt-2">团委</h6>

      <a href="#党群/003"
          className={`list-group-item list-group-item-action ${props.category === '003' ? 'active' : ''}`}
      >
        团支部基本情况表
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#党群/004"
          className={`list-group-item list-group-item-action ${props.category === '004' ? 'active' : ''}`}
      >
        团员（青年）名册
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#党群/005"
          className={`list-group-item list-group-item-action ${props.category === '005' ? 'active' : ''}`}
      >
        入团积极分子名册
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#党群/006"
          className={`list-group-item list-group-item-action ${props.category === '006' ? 'active' : ''}`}
      >
        已递交入党申请书团员名册
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#党群/007"
          className={`list-group-item list-group-item-action ${props.category === '007' ? 'active' : ''}`}
      >
        已被确定入党积极分子（发展入党）团员名册
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#党群/008"
          className={`list-group-item list-group-item-action ${props.category === '008' ? 'active' : ''}`}
      >
        团员奖惩情况登记表
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#党群/009"
          className={`list-group-item list-group-item-action ${props.category === '009' ? 'active' : ''}`}
      >
        团员组织关系转入转出名册
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#党群/010"
          className={`list-group-item list-group-item-action ${props.category === '010' ? 'active' : ''}`}
      >
        超龄离团团员名册
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>
    </div>
  )
}
