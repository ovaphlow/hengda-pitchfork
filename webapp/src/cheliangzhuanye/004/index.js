import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import List from './List'
import Save from './Save'
import SaveAlt from './SaveAlt'
import Detail from './Detail'
import RejectList from './RejectList'
import CheckPjsy from './CheckPjsy'
import ReviewOperator from './ReviewOperator'
import ReviewLeader from './ReviewLeader'
import ReviewPjsy from './ReviewPjsy'
import ToDoList from './ToDoList'

export const Index = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/车辆专业/004"><List /></Route>
        <Route path="/车辆专业/004/新增"><Save /></Route>
        <Route path="/车辆专业/004/新增计划外"><SaveAlt /></Route>
        <Route path="/车辆专业/004/已驳回申请"><RejectList /></Route>
        <Route path="/车辆专业/004/待处理申请"><ToDoList /></Route>
        <Route exact path="/车辆专业/004/:id"><Detail /></Route>
        <Route path="/车辆专业/004/:id/技术员审核"><CheckPjsy /></Route>
        <Route path="/车辆专业/004/:id/作业负责人销记"><ReviewOperator /></Route>
        <Route path="/车辆专业/004/:id/工长销记"><ReviewLeader /></Route>
        <Route path="/车辆专业/004/:id/技术员销记"><ReviewPjsy /></Route>
      </Switch>
    </Router>
  )
}
