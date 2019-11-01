import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import SignIn from '../SignIn'
import { List as DeptList, Save as DeptSave, Update as DeptUpdate } from './Dept'
import { List as UserList, Save as UserSave, Update as UserUpdate } from './User'

const MDSIndex = () => {
  React.useEffect(() => {
    let a = JSON.parse(sessionStorage.getItem('auth_mds'))
    if (!!!a) {
      window.location = '#数据管理/登录'
      return
    }
  })

  return (
    <HashRouter>
      <Switch>
        <Route path="/数据管理/登录" component={SignIn} />
        <Route exact path="/数据管理/" component={DeptList} />
        <Route exact path="/数据管理/车间" component={DeptList} />
        <Route exact path="/数据管理/车间/新增" component={DeptSave} />
        <Route path="/数据管理/车间/:id" component={DeptUpdate} />
        <Route exact path="/数据管理/用户" component={UserList} />
        <Route exact path="/数据管理/用户/新增" component={UserSave} />
        <Route path="/数据管理/用户/:id" component={UserUpdate} />
      </Switch>
    </HashRouter>
  )
}

export default MDSIndex
