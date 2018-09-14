import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Example1 from '../model/example1'
import Example2 from '../model/example2'
import Root from '../App'
import { routeAuthWrapper } from '../utils/auth'

let routeConfig = [
  {
    path: '/',
    exact: true,
    component: Root,
    childRoutes: [
      {
        path: 'example1',
        component: routeAuthWrapper(Example1, { redirectPath: 'example2', displayName :' EXAMPLE1' })
      },
      {
        path: 'example2',
        getComponent(location, cb) {
          cb(null, Example2)
        }
      },
      {
        path: 'example3',
        component: Example1
      },
    ]
  }
]

export default <Router history={browserHistory} routes={routeConfig} />