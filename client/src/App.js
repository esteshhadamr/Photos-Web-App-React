import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Auth from './Auth';
import AppRoute from './AppRoute';
import AppHeader from './components/AppHeader';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddPhoto from './components/AddPhoto';
import MyPhotos from './components/MyPhotos';
import NotFound from './components/NotFound';
// React Notifications
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

class App extends Component {

  constructor(props) {
    super(props);

    Auth.init();

  }

  render() {

    return (

      <Router>

        <div>
          <AppHeader></AppHeader>

          <div className="container">
            <div>

              <Switch>
                <AppRoute path='/' exact component={Home} redirect='/' />
                <AppRoute path='/login' component={Login} can={Auth.guest} redirect='/' />
                <AppRoute path='/Register' component={Register} can={Auth.guest} redirect='/' />
                <AppRoute path='/addphoto' component={AddPhoto} can={Auth.auth} redirect='/login' />
                <AppRoute path='/myphotos' component={MyPhotos} can={Auth.auth} redirect='/login' />
                <AppRoute component={NotFound} />

              </Switch>

            </div>
          </div>
          <NotificationContainer />

        </div>

      </Router>
    );
  }
}

export default App;

