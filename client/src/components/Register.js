import React from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { NotificationManager } from 'react-notifications';


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
            FormValid: false

        };
    }

    //Handle input onChange
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // //onSubmit click handler
    submitHandler = event => {
        event.preventDefault();
        const form = event.currentTarget;
        let data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        if (form.checkValidity() === false) {
            event.target.className += ' was-validated';
            NotificationManager.error('Some data are missing', '', 3000);
            this.setState({ FormValid: false })
            event.preventDefault();
        } else {
            axios.post('/api/auth/register', data).then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                axios.defaults.headers.common = { 'Authorization': res.data.token };
                NotificationManager.success('Sign Up successfully', 'Successful!', 3000);

                this.props.history.push('/login');
            })
                .catch(err => {
                    this.setState({ error: err.response.data.message });
                    NotificationManager.error(this.state.error, '', 3000);
                });
        }
    };

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="8">
                        <form className='needs-validation' onSubmit={this.submitHandler} noValidate>
                            <p className="h5 text-center mb-4">Sign up</p>
                            <div className="grey-text">

                                <MDBInput value={this.state.username} name="username" onChange={this.changeHandler}
                                    label="User name" icon="user" group type="text" error="wrong" success="right" required>
                                    <div className='invalid-feedback ml-3 pl-3'>Username is required</div>
                                </MDBInput>
                                <MDBInput label="Email address" value={this.state.email} name="email" onChange={this.changeHandler}
                                    icon="envelope" group type="email" error="wrong" success="right" required >
                                    <div className='invalid-feedback ml-3 pl-3'>Email is required</div>
                                </MDBInput>
                                <MDBInput label="Password" value={this.state.password} name="password" onChange={this.changeHandler}
                                    icon="lock" group type="password" required >
                                    <div className='invalid-feedback ml-3 pl-3'>Password is required</div>
                                </MDBInput>
                                <div className="text-center">
                                    <MDBBtn type="submit" >Register</MDBBtn>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer >

        );
    }
}
export default Register