import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import Application from './components/App';
import './index.css'
import firebase from './firebase';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux/reducers';
import { setUser, clearUser } from './redux';


const store = createStore(rootReducer, composeWithDevTools())


const Root = ({ history, setUser, clearUser }) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        history.push('/');
      } else {
        history.push('/login');
        clearUser();
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

const RootWithAuth = withRouter(connect(null, { setUser, clearUser })(Root))

ReactDOM.render(
  <Provider store={store} >
    <Router >
      <RootWithAuth />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
