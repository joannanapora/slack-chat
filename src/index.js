import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Application from './components/App';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import './index.css'
import firebase from './firebase';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux/reducers';
import { setUser } from './redux';


const store = createStore(rootReducer, composeWithDevTools())


const Root = ({ history, setUser }) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        history.push('/');
      }
    })
  }, [])

  return (
    <Switch>
      <Route exact path="/" component={Application} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  )
}

const RootWithAuth = withRouter(connect(null, { setUser })(Root))

ReactDOM.render(
  <Provider store={store} >
    <Router >
      <RootWithAuth />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
