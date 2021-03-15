import React from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

class Login extends React.Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('token')) {
            this.props.history.push('/');
        }
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    //Handle input onChange
    onChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    };

    // On Submit click listener.
    onSubmit = e => {
        e.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/api/auth', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.id);
                axios.get('/users/' + res.data.id)
                    .then(res => {
                        localStorage.setItem('user', JSON.stringify(res.data));
                    })
                axios.defaults.headers.common = { 'Authorization': res.data.token };
                this.props.history.push('/');

            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
    }

    // Message for input validation
    renderError() {
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="8">
                        <form onSubmit={this.onSubmit}>
                            <p className="h5 text-center mb-4">Sign in</p>
                            <div className="grey-text">

                                <MDBInput label="Your email" value={this.state.email} name="email" onChange={this.onChangeHandler}
                                    icon="envelope" group type="email" validate error="wrong" success="right" />


                                <MDBInput label="Your password" value={this.state.password} name="password" onChange={this.onChangeHandler}
                                    icon="lock" group type="password" validate />

                            </div>
                            <div className="text-center">
                                <MDBBtn type="submit" onClick={this.onSubmit} >Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Login