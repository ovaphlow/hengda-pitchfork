import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import SignIn from '../SignIn'
import { List as DeptList, Save as DeptSave, Update as DeptUpdate } from './Dept'
import { List as UserList, Save as UserSave, Update as UserUpdate } from './User'
import {
  List as ModelList,
  Save as ModelSave,
  Update as ModelUpdate
} from './Model'
import {
  List as TrainList,
  Save as TrainSave,
  Update as TrainUpdate,
} from './Train'

export const Index = () => {
  React.useEffect(() => {
    let a = JSON.parse(sessionStorage.getItem('auth_super'))
    if (!!!a) {
      window.location = '#数据管理/登录'
      return
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/数据管理/登录">
          <SignIn />
        </Route>

        <Route exact path="/数据管理">
          <DeptList />
        </Route>

        <Route exact path="/数据管理/部门结构">
          <DeptList />
        </Route>

        <Route path="/数据管理/部门结构/新增">
          <DeptSave />
        </Route>

        <Route exact path="/数据管理/部门结构/:id">
          <DeptUpdate />
        </Route>

        <Route path="/数据管理/部门结构/:id/新增">
          <DeptSave />
        </Route>

        <Route exact path="/数据管理/用户">
          <UserList />
        </Route>

        <Route path="/数据管理/用户/新增">
          <UserSave />
        </Route>

        <Route path="/数据管理/用户/:id">
          <UserUpdate />
        </Route>

        <Route exact path="/数据管理/车型">
          <ModelList />
        </Route>

        <Route path="/数据管理/车型/新增">
          <ModelSave />
        </Route>

        <Route path="/数据管理/车型/:id">
          <ModelUpdate />
        </Route>

        <Route exact path="/数据管理/车组">
          <TrainList />
        </Route>

        <Route path="/数据管理/车组/新增">
          <TrainSave />
        </Route>

        <Route path="/数据管理/车组/:id">
          <TrainUpdate />
        </Route>
      </Switch>
    </Router>
  )
}
