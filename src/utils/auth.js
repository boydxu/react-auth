import { initAuthComponent, initRouteAuthWrapper } from '../react-auth'


const AuthComponent = initAuthComponent({
  codeAuthenticator: (code, operator) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (['Input', 'a'].indexOf(code) > -1) {
          resolve()
        }
        reject('err')
      }, 2000);
    })
  },
  model: 'disabled'
})

const routeAuthWrapper = initRouteAuthWrapper({
  routeAuthenticator: (path) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve()
        reject('err')
      }, 2000);
    })
  }
})

export {
  AuthComponent,
  routeAuthWrapper
}