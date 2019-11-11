import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Signature from './Signature'

export const Index = () => {
  React.useEffect(() => {
    console.info('user index')
    let a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) {
      window.location = '#登录'
      return
    }
  })

  return (
    <HashRouter>
      <Switch>
        <Route path='/用户/签名' component={Signature} />
      </Switch>
    </HashRouter>
  )
}
