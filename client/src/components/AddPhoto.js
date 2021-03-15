import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { withRouter } from 'react-router-dom';
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
        const data = new FormData();
        data.append('location', this.state.location);
        data.append('description', this.state.description);
        data.append('author', this.state.authorid);

        if (this.state.avatar) data.append('avatar', this.state.avatar, this.state.avatar.name);
        axios.post('/api/photos', data)
            .then(this.props.toggle)
            .catch(err => this.setState({
                error: err.response.data.message
            }));

        this.setState({ show: false });
        this.props.handler(data);

        // To Reload page after save
        setTimeout(function () { window.location.reload(); }, 1000);

    };
    render() {
        return (
            <MDBContainer>

                <MDBModal isOpen={this.state.show} toggle={() => this.props.handler({})}>
                    <MDBModalHeader toggle={() => this.props.handler({})} >Upload new photo</MDBModalHeader>
                    <form onSubmit={this.onSubmit}>
                        <MDBModalBody>

                            <div >
                                <div className="row">
                                    <Photo className="row img-upload" src={this.state.avatar} file={this.state.image} />

                                </div>
                                <br />
                                <div>
                                    <label  >Description</label>
                                    <input type="text" value={this.state.description} name="description"
                                        onChange={this.onChangeHandler} id="description" className="form-control" />
                                </div>
                                <br />

                                <div>
                                    <label>Location</label>
                                    <input type="text" value={this.state.location} name="location"
                                        onChange={this.onChangeHandler} id="location" className="form-control" />
                                </div>
                            </div>

                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={() => this.props.handler({})}>Close</MDBBtn>
                            <div className="text-center">
                                <MDBBtn type="submit" color="primary" onClick={this.onSubmit} >Upload</MDBBtn>
                            </div>
                        </MDBModalFooter>
                    </form>
                </MDBModal>
            </MDBContainer>
        );
    }
}
export default withRouter(AddPhotoModal);