import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import List from './List'
import Save from './Save'
import SaveAlt from './SaveAlt'
import Detail from './Detail'
import Update from './Update'
import RejectList from './RejectList'
import CheckPjsy from './CheckPjsy'
import ReviewOperator from './ReviewOperator'
import SaveDetail1 from './SaveDetail1'
import SaveDetail2 from './SaveDetail2'
import SaveDetail3 from './SaveDetail3'
import SaveDetail4 from './SaveDetail4'
import ReviewLeader from './ReviewLeader'
import ReviewTeam from './ReviewTeam'
import ReviewQc from './ReviewQc'
import ReviewPjsy from './ReviewPjsy'
import ReviewPdd from './ReviewPdd'
import ToDoList from './ToDoList'
import UploadSchedule from './UploadSchedule'
import Statistic from './Statistic'

export const Index = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/车辆专业/004"><List /></Route>
        <Route path="/车辆专业/004/上传作业计划"><UploadSchedule /></Route>
        <Route path="/车辆专业/004/新增"><Save /></Route>
        <Route path="/车辆专业/004/新增计划外"><SaveAlt /></Route>
        <Route path="/车辆专业/004/已驳回申请"><RejectList /></Route>
        <Route path="/车辆专业/004/待处理申请"><ToDoList /></Route>
        <Route path="/车辆专业/004/统计"><Statistic /></Route>
        <Route exact path="/车辆专业/004/:id"><Detail /></Route>
        <Route exact path="/车辆专业/004/编辑/:id"><Update /></Route>
        <Route path="/车辆专业/004/:id/技术员审核"><CheckPjsy /></Route>
        <Route exact path="/车辆专业/004/:id/作业负责人销记"><ReviewOperator /></Route>
        <Route path="/车辆专业/004/:id/作业负责人销记/1"><SaveDetail1 /></Route>
        <Route path="/车辆专业/004/:id/作业负责人销记/2"><SaveDetail2 /></Route>
        <Route path="/车辆专业/004/:id/作业负责人销记/3"><SaveDetail3 /></Route>
        <Route path="/车辆专业/004/:id/作业负责人销记/4"><SaveDetail4 /></Route>
        <Route path="/车辆专业/004/:id/工长销记"><ReviewLeader /></Route>
        <Route path="/车辆专业/004/:id/班组销记"><ReviewTeam /></Route>
        <Route path="/车辆专业/004/:id/质检销记"><ReviewQc /></Route>
        <Route path="/车辆专业/004/:id/技术员销记"><ReviewPjsy /></Route>
        <Route path="/车辆专业/004/:id/调度销记"><ReviewPdd /></Route>
      </Switch>
    </Router>
  )
}
