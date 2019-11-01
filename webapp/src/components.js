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
            <a className="nav-link" href="#/">
              <i className="fa fa-fw fa-home"></i>
              首页
              <span className="sr-only">(current)</span>
            </a>
          </li>

          <li className={`nav-item ${props.category === 'archive' ? 'active' : ''}`}>
            <a className="nav-link" href="#帐项/">
              <i className="fa fa-fw fa-file-archive-o"></i>
              电子帐项
            </a>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          <li className={`nav-item ${props.category === 'mds' ? 'active' : ''}`}>
            <a className="nav-link text-dark" href="#数据管理/操作记录">
              <i className="fa fa-fw fa-cogs"></i>
              数据管理
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
