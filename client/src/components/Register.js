import React from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            error: ''
        };
    }

    //Handle input onChange
    onChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    };

    //onSubmit click handler
    onSubmit = e => {
        e.preventDefault();
        let data = {
            username: this.state.username, email: this.state.email, password: this.state.password
        };

        axios.post('/api/auth/register', data).then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('_id', res.data._id);
            axios.defaults.headers.common = { 'Authorization': res.data.token };
            this.props.history.push('/login');
        })
            .catch(err => {
                this.setState({ error: err.response.data.message });
            });
    };

    // Message for inputs validation
    renderError() {
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="8">
                        <form onSubmit={this.onSubmit}>
                            <p className="h5 text-center mb-4">Sign up</p>
                            <div className="grey-text">
                                <MDBInput value={this.state.username} name="username" onChange={this.onChangeHandler}
                                    label="Your name" icon="user" group type="text" validate error="wrong" success="right" />
                                <MDBInput label="Your email" value={this.state.email} name="email" onChange={this.onChangeHandler}
                                    icon="envelope" group type="email" validate error="wrong" success="right" />


                                <MDBInput label="Your password" value={this.state.password} name="password" onChange={this.onChangeHandler}
                                    icon="lock" group type="password" validate />

                            </div>
                            <div className="text-center">
                                <MDBBtn type="submit" onClick={this.onSubmit} >Register</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );
    }
}
export default Register