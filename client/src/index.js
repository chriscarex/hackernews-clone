import React from 'react'
import ReactDOM from 'react-dom'
import {
  Switch,
  Route,
  BrowserRouter
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store'
import Notification from 'components/Notification'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import FullPageLoader from 'components/FullPageLoader'
import Articles from 'components/Articles'
import {
  ROUTE_HOME
} from 'constants/routes'
import 'semantic-ui-css/semantic.min.css'
import 'styles/styles.scss'

window.store = store

const provider = (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <div className="index-container">
        <Header />
        <div className="main-container">
          <Sidebar />
          <Switch>
            <Route exact path={ROUTE_HOME} component={Articles} />
          </Switch>
        </div>
        <FullPageLoader />
        <Notification />
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(provider, document.getElementById('root'))
