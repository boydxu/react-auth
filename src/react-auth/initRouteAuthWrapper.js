import React, { Component } from 'react'

export default function initRouteAuthWrapper({ routeAuthenticator = () => { }, LoadingComponent }) {

  return (BusinessComponent, wrapperProps = {}) => {
    class WrapperComponent extends Component {
      constructor(props) {
        super(props)
        this.state = {
          loading: true,
        }
        console.log(props);
        this.runRouteAuthenticator(this.props.location.pathname, props)
      }
      runRouteAuthenticator(pathname, props) {
        const r = wrapperProps.routeAuthenticator ? wrapperProps.routeAuthenticator(pathname) : routeAuthenticator(pathname)
        if (r && typeof r.then === 'function') {
          r.then(() => {
            this.setState({
              loading: false
            })
          }).catch(err => {
            let redirectPath = typeof wrapperProps.redirectPath === 'function' ? wrapperProps.redirectPath() : wrapperProps.redirectPath
            props.router.replace(redirectPath)
          })
        } else {
          // 同步更新
          if (!!r) {
            this.setState({
              loading: false,
            })
          } else {
            let redirectPath = typeof wrapperProps.redirectPath === 'function' ? wrapperProps.redirectPath() : wrapperProps.redirectPath
            props.router.replace(redirectPath)
          }
        }
      }
      render() {
        const { loading } = this.state
        if (loading) {
          const Loading = LoadingComponent ? LoadingComponent : wrapperProps.LoadingComponent
          return <Loading />
        }
        return <BusinessComponent {...this.props} />
      }
    }
    wrapperProps.displayName && (WrapperComponent.displayName = wrapperProps.displayName)
    return WrapperComponent
  }
}