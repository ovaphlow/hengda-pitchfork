import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import SignIn from './SignIn'
import { Index as MDSIndex } from './mds'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/登录" component={SignIn} />
        <Route paht="/数据管理" component={MDSIndex} />
      </Switch>
    </HashRouter>
  )
}

export default App
