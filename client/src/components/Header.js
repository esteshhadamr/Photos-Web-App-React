import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import AddPhotoModal from './AddPhoto';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.fileUpload = React.createRef();
        this.state = {
            AddPhotoshow: false,
            // userData: (localStorage.getItem('user')) ? (localStorage.getItem('user')) : '',
            
        };
    }

    // Handle Logout listener
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        this.props.history.push('/');

    }


    // Trigger click on file upload input
    showFileUpload = e => this.fileUpload.current.click();

    onImageChange = e => {
        this.OpenAddPhotoModal(e);
    };

    OpenAddPhotoModal = (row) => {
        this.setState({
            image: URL.createObjectURL(row.target.files[0]),
            avatar: row.target.files[0],
            AddPhotoshow: true,
            Photo: row,

        });
    };

    CloseAddPhotoModal = () => {
        this.setState({ AddPhotoshow: false });
    };

    render() {
        if (localStorage.getItem('token')) {
            
            return (
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <h5><b>Welcome</b></h5>

                            <ul className="row">
                                {/* <div className="text-left">
                                    <h4>Welcome </h4>
                                    small>{this.state.userData.username}</small> 
                                </div> */}
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/myphotos">My photos</Link></li>
                                <li>
                                    <input type="file" ref={this.fileUpload} onChange={this.onImageChange} className="d-none" />
                                    {/* <i class="fas fa-upload"></i> */}
                                    {/* <div><i className="fas fa-upload " aria-hidden="true" title="Upload photo" onClick={this.OpenAddPhotoModal} >Upload</i></div> */}
                                    <i title="Upload photo" onClick={this.showFileUpload} > Upload</i>
                                </li>


                                <li><Link id="logout" to="/" onClick={this.logout}>Log Out</Link></li>
                            </ul>
                        </div>
                    </nav>
                    {(this.state.AddPhotoshow) ? <AddPhotoModal Photo={this.state.Photo} file={this.state.image} src={this.state.avatar} handler={this.CloseAddPhotoModal} /> : null}

                </div>

            );
        }

        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <span>Have an account?</span>
                        <ul>
                            <li ><Link to="/login">Log In</Link></li>
                            <li><Link to="/register">Sign Up</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(Header)