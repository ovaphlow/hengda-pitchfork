import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'
import SignIn from './SignIn'
import { Index as MDSIndex } from './mds'
import { Index as ZhangXiangIndex } from './zhangxiang'
import { Index as UserIndex } from './user'
import { Index as DangQunIndex } from './dangqun'
import { Index as AnQuanIndex } from './anquan'
import { Index as CheLiangZhuanYeIndex } from './cheliangzhuanye'
import { Index as ChengBenCaiLiaoIndex } from './chengbencailiao'
import { Index as ZhiGongPeiXunIndex } from './zhigongpeixun'
import { Index as ZongHeGuanLiIndex } from './zongheguanli'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/登录">
          <SignIn />
        </Route>

        <Route path="/帐项">
          <ZhangXiangIndex />
        </Route>

        <Route path="/数据管理">
          <MDSIndex />
        </Route>

        <Route path="/用户">
          <UserIndex />
        </Route>

        <Route path="/党群">
          <DangQunIndex />
        </Route>

        <Route path="/安全">
          <AnQuanIndex />
        </Route>

        <Route path="/车辆专业">
          <CheLiangZhuanYeIndex />
        </Route>

        <Route path="/成本材料">
          <ChengBenCaiLiaoIndex />
        </Route>

        <Route path="/职工培训">
          <ZhiGongPeiXunIndex />
        </Route>

        <Route path="/综合管理">
          <ZongHeGuanLiIndex />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
