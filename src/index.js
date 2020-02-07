import React from 'react'
import ReactDOM from 'react-dom'
import {
  // Switch,
  // Route,
  BrowserRouter
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store'
import Notification from 'components/Notification'
import Header from 'components/Header'
import FullPageLoader from 'components/FullPageLoader'
import Sidebar from 'components/Sidebar'
// import {
//   ROUTE_HOME,
//   ROUTE_ARTICLE
// } from 'constants/routes'
import 'semantic-ui-css/semantic.min.css'
import 'styles/styles.scss'

// to view the state tree in the console
window.store = store

const provider = (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <div className="index-container">
        <Header />
        {/*
          <Switch>
            <Route exact path={ROUTE_HOME} component={Dashboard} />
            <Route exact path={ROUTE_ARTICLE} component={Post} />
          </Switch>
        */}
        <Sidebar />
        <FullPageLoader />
        <Notification />
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(provider, document.getElementById('root'))
