import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// import Auth from './Auth';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddPhoto from './components/AddPhoto';
import MyPhotos from './components/MyPhotos';



class App extends Component {

  constructor(props) {
    super(props);

    let token = localStorage.getItem('token');
    axios.defaults.headers.common = { 'Authorization': token };

  }

  render() {

    return (

      <Router>

        <div>
          <Header></Header>

          <div className="container">
            <div>
              <Switch>

                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/Register" component={Register} />
                <Route path="/addphoto" component={AddPhoto} />
                <Route path="/myphotos" component={MyPhotos} />


              </Switch>
            </div>
          </div>
        </div>

      </Router>
    );
  }
}

export default App;

