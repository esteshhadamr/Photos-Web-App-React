import React from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { NotificationManager } from 'react-notifications';
import Auth from '../Auth';
class Login extends React.Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('token')) {
            this.props.history.push('/');
        }
        this.state = {
            email: '',
            password: '',
        };
    }

    //Handle input onChange
    onChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // On Submit click listener.
    onSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        let data = {
            email: this.state.email,
            password: this.state.password
        };
        //Check input validation
        if (form.checkValidity() === false) {
            event.target.className += ' was-validated';
            NotificationManager.error('Some data are missing', '', 3000);
            event.preventDefault();
        }
        else {
            axios.post('/api/auth', data)
                .then(res => {
                    Auth.login(res.data);
                    axios.get('/users/' + res.data.id)
                        .then(res => {
                            localStorage.setItem('user_data', JSON.stringify(res.data));
                            NotificationManager.success('Login successfully', '', 3000);
                            this.props.history.push('/');
                        })
                })
                .catch(error => {
                    NotificationManager.error(error.response.data.message, '', 3000);
                })
        }
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="8">
                        <form className='needs-validation' onSubmit={this.onSubmit} noValidate>
                            <p className="h5 text-center mb-4">Sign in</p>
                            <div className="grey-text">
                                <MDBInput label="Email address" value={this.state.email} name="email" onChange={this.onChangeHandler}
                                    icon="envelope" group type="email" error="wrong" success="right" required >
                                    <div className='invalid-feedback ml-3 pl-3'>Email is required</div>
                                </MDBInput>
                                <MDBInput label="Password" value={this.state.password} name="password" onChange={this.onChangeHandler}
                                    icon="lock" group type="password" required >
                                    <div className='invalid-feedback ml-3 pl-3'>Password is required</div>
                                </MDBInput>
                                <div className="text-center">
                                    <MDBBtn type="submit"  >Login</MDBBtn>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Login