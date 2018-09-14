import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default function initAuthComponent({ codeAuthenticator = () => { }, noAuthProps, operator = '&', model = 'hide' }) {
  class Auth extends Component {
    constructor(props) {
      super()
      this.state = {
        authenticated: false,
        loading: true,
      }
      this.runCodeAuthenticator(props.authCode, props.operator, props)
    }
    runCodeAuthenticator(code, operator, props) {
      const r = props.codeAuthenticator ? props.codeAuthenticator(code, operator) : codeAuthenticator(code, operator)
      if (r && typeof r.then === 'function') {
        r.then(() => {
          this.setState({
            loading: false,
            authenticated: true,
          })
        }).catch(err => {
          this.setState({
            loading: false,
            authenticated: false,
          })
        })
      } else {
        // 同步更新
        this.setState({
          loading: false,
          authenticated: !!r,
        })
      }
    }
    static propsTypes = {
      authCode: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      noAuthProps: PropTypes.object,
      operator: PropTypes.oneOf(['&', '|']),
      model: PropTypes.oneOf(['hide', 'disabled']),
      codeAuthenticator: PropTypes.func,
    }
    static defaultProps = {
      operator: operator,
      model: model,
      noAuthProps: noAuthProps
    }
    render() {
      const { children, noAuthProps, model } = this.props;
      const { loading, authenticated } = this.state;

      if (React.Children.count(children) !== 1) {
        console.error('children should be only one')
        return children
      }
      let props
      if (loading) {
        return null
      }
      if (!loading && authenticated) {
        return children
      }
      switch (model) {
        case 'hide':
          return null
        case 'disabled':
          props = { ...noAuthProps, disabled: true }
          break;
        default:
          console.error('model must be one of ["hide","disabled"]');
          props = { ...noAuthProps, disabled: true }
          break;
      }
      return (
        React.cloneElement(children, { ...props })
      )
    }
  }
  return Auth
}