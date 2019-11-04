import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import SignIn from '../SignIn'
import { List as DeptList, Save as DeptSave, Update as DeptUpdate } from './Dept'
import { List as UserList, Save as UserSave, Update as UserUpdate } from './User'

export const Index = () => {
  React.useEffect(() => {
    let a = JSON.parse(sessionStorage.getItem('auth_super'))
    if (!!!a) {
      window.location = '#数据管理/登录'
      return
    }
  })

  return (
    <HashRouter>
      <Switch>
        <Route path="/数据管理/登录" component={SignIn} />
        <Route exact path="/数据管理" component={DeptList} />
        <Route exact path="/数据管理/部门结构" component={DeptList} />
        <Route exact path="/数据管理/部门结构/新增" component={DeptSave} />
        <Route exact path="/数据管理/部门结构/:id" component={DeptUpdate} />
        <Route exact path="/数据管理/部门结构/:id/新增" component={DeptSave} />
        <Route exact path="/数据管理/用户" component={UserList} />
        <Route exact path="/数据管理/用户/新增" component={UserSave} />
        <Route path="/数据管理/用户/:id" component={UserUpdate} />
      </Switch>
    </HashRouter>
  )
}
