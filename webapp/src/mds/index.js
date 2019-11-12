import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import SignInSuper from './SignInSuper'
import { List as DeptList, Save as DeptSave, Update as DeptUpdate } from './Dept'
import { List as UserList, Save as UserSave, Update as UserUpdate } from './User'

export const Index = () => {
  React.useEffect(() => {
    let a = JSON.parse(sessionStorage.getItem('auth_super'))
    if (!!!a) {
      window.location = '#数据管理/登录'
      return
    }
  }, [])

  return (
    <Router basename="/数据管理">
      <Switch>
        <Route exact path="/数据管理/登录">
          <SignInSuper />
        </Route>

        <Route exact path="/数据管理">
          <DeptList />
        </Route>

        <Route exact path="/数据管理/部门结构">
          <DeptList />
        </Route>

        <Route exact path="/数据管理/部门结构/新增">
          <DeptSave />
        </Route>

        <Route exact path="/数据管理/部门结构/:id">
          <DeptUpdate />
        </Route>

        <Route exact path="/数据管理/部门结构/:id/新增">
          <DeptSave />
        </Route>

        <Route exact path="/数据管理/用户">
          <UserList />
        </Route>

        <Route exact path="/数据管理/用户/新增">
          <UserSave />
        </Route>

        <Route exact path="/数据管理/用户/:id">
          <UserUpdate />
        </Route>
      </Switch>
    </Router>
  )
}
