import React from 'react'

export const Title = props => {
  return (
    <h1 className="text-light title-color" style={{ marginTop: -48 }}>
      &nbsp;
      车辆段
    </h1>
  )
}

export const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark sticky-top title-color" style={{ marginTop: '-8px' }}>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${props.category === 'home' ? 'active' : ''}`}>
            <a href="#/" className="nav-link">
              <i className="fa fa-fw fa-home"></i>
              首页
              <span className="sr-only">(current)</span>
            </a>
          </li>

          <li className={`nav-item ${props.category === '党群' ? 'active' : ''}`}>
            <a href="#党群" className="nav-link">
              党群台帐
            </a>
          </li>

          <li className={`nav-item ${props.category === '安全' ? 'active' : ''}`}>
            <a href="#安全" className="nav-link">
              安全台帐
            </a>
          </li>

          <li className={`nav-item ${props.category === '车辆专业' ? 'active' : ''}`}>
            <a href="#车辆专业" className="nav-link">
              车辆专业台帐
            </a>
          </li>

          <li className={`nav-item ${props.category === '成本材料' ? 'active' : ''}`}>
            <a href="#成本材料" className="nav-link">
              成本材料台帐
            </a>
          </li>

          <li className={`nav-item ${props.category === '职工培训' ? 'active' : ''}`}>
            <a href="#职工培训" className="nav-link">
              职工培训台帐
            </a>
          </li>

          <li className={`nav-item ${props.category === '综合管理' ? 'active' : ''}`}>
            <a href="#综合管理" className="nav-link">
              综合管理台帐
            </a>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          <li className={`nav-item ${props.category === 'mds' ? 'active' : ''}`}>
            <a href="#数据管理" className="nav-link text-dark">
              <i className="fa fa-fw fa-cogs"></i>
              数据管理
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
