import React from 'react'

export const SideNav = props => {
  return (
    <div className="list-group shadow">
      <h6 className="text-muted text-center mt-2">选择功能</h6>

      <a href="#数据管理/部门结构"
          className={`list-group-item list-group-item-action ${props.category === 'dept' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-sitemap"></i>
        部门结构
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#数据管理/用户"
          className={`list-group-item list-group-item-action ${props.category === 'user' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-users"></i>
        用户
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>
    </div>
  )
}

// 选择部门，返回id
export const DeptPicker = props => {
  const [list, setList] = React.useState([])

  React.useEffect(() => {
    fetch(`/api/common/dept/sub`)
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        setList(res.content)
      })
      .catch(err => window.console.error(err))
  }, [])

  return (
    <div className="form-group">
      <label>部门</label>
      <select name={props.name || 'dept_id'} value={props.value || ''}
          className="form-control"
          onChange={props.onChange}
      >
        <option value="0">未选择</option>
        {
          list.map(it => (
            <option value={it.id} key={it.id}>{it.v}</option>
          ))
        }
      </select>
    </div>
  )
}
