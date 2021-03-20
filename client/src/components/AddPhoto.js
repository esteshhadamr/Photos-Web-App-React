import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

import axios from 'axios';
import Photo from './Photo';

class AddPhotoModal extends React.Component {


    constructor(props) {
        super(props);
        this.fileUpload = React.createRef();

        this.state = {

            show: true,
            authorid: localStorage.getItem('userId'),
            image: (this.props.file) ? this.props.file : '',
            avatar: (this.props.src) ? this.props.src : '',
            location: '',
            description: ''
        };

    }

    //Handle input onChange
    onChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    };

    onSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        const data = new FormData();
        data.append('location', this.state.location);
        data.append('description', this.state.description);
        data.append('author', this.state.authorid);
        if (this.state.avatar) data.append('avatar', this.state.avatar, this.state.avatar.name);
        if (form.checkValidity() === false) {
            e.target.className += ' was-validated';
            NotificationManager.error('Some data are missing', '', 3000);
            e.preventDefault();
        }
        else {
            axios.post('/api/photos', data)
                .then(this.props.toggle)
                .catch(error => {
                    this.setState({
                        error: error.response.data.message
                    });
                    NotificationManager.error(error.response.data.message, '', 10000);
                })
            this.setState({ show: false });
            this.props.handler(data);
            // To Reload page after save
            setTimeout(function () { window.location.reload(); }, 1000);
        }
    };
    render() {
        return (
            <MDBContainer>

                <MDBModal isOpen={this.state.show} toggle={() => this.props.handler({})}>
                    <MDBModalHeader toggle={() => this.props.handler({})} >Upload new photo</MDBModalHeader>
                    <form onSubmit={this.onSubmit} className='needs-validation' noValidate>
                        <MDBModalBody>

                            <div className="grey-text">
                                <div className="row">
                                    <Photo className="row img-upload" src={this.state.avatar} file={this.state.image} />

                                </div>
                                <br />
                                <MDBInput label="Description" value={this.state.description} name="description" onChange={this.onChangeHandler}
                                    icon=" fa-sticky-note" group type="text" error="wrong" success="right" required >
                                    <div className='invalid-feedback ml-3 pl-3'>Description is required</div>
                                </MDBInput>
                                <MDBInput label="Location" value={this.state.location} name="location" onChange={this.onChangeHandler}
                                    icon=" fa-location-arrow" group type="text" required >
                                    <div className='invalid-feedback ml-3 pl-3'>Location is required</div>
                                </MDBInput>

                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={() => this.props.handler({})}>Close</MDBBtn>
                            <div className="text-center">
                                <MDBBtn type="submit" color="primary"  >Upload</MDBBtn>
                            </div>
                        </MDBModalFooter>
                    </form>
                </MDBModal>
            </MDBContainer>
        );
    }
}
export default withRouter(AddPhotoModal);