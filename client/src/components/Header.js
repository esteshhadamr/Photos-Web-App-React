import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {

    // Handle Logout listener
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        axios.defaults.headers.common = { 'Authorization': '' };
        this.props.history.push('/');
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/addphoto">Add Photo</Link></li>
                                <li><Link to="/" onClick={this.logout}>Log Out</Link></li>

                                {/* <li><a href="#" onClick={this.logout}>Log Out</a></li> */}
                            </ul>
                        </div>
                    </nav>
                </div>

            );
        }

        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <ul>

                            <li><Link to="/login">Log In</Link></li>
                            <li><Link to="/register">Sign Up</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(Header)