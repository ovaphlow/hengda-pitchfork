import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import SignIn from './SignIn'
import { Index as MDSIndex } from './mds'
import { Index as ZhangXiangIndex } from './zhangxiang'
import { Index as UserIndex } from './user'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/登录" component={SignIn} />
        <Route exact path="/帐项" component={ZhangXiangIndex} />
        <Route exact path="/数据管理" component={MDSIndex} />
        <Route exact path="/用户" component={UserIndex} />
      </Switch>
    </HashRouter>
  )
}

export default App
