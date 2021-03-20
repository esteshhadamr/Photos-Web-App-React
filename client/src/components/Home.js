import React from 'react';
import axios from 'axios';
import { MDBCard, MDBCardText } from 'mdbreact';
import Photo from './Photo';

// Home Component
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            error: '',
            isLoading: true
        };
    }

    componentWillMount() {
        this.fetchPhotos();
    }

    // Get all photos from server
    fetchPhotos() {
        axios.get('/api/photos')
            .then(res => {
                this.setState({
                    photos: res.data,
                    error: '',
                    isLoading: false
                });
            })
            .catch(err => {
                this.setState({
                    // error: err.response.data.message,
                    isLoading: false
                });
            });
    };

    render() {
        if (this.state.isLoading) {
            return <div className="spinner-border text-primary" role="status"></div>

        }

        //To handle Error(not coding yet)
        // if (this.state.error) {
        //     return (<blockquote>{this.state.error}</blockquote>);
        // }

        if (this.state.photos.length < 1) {
            return (<h3>no photos to show </h3>);
        }

        var allPhotos = this.state.photos.map(function (photo) {
            return (
                <div key={photo._id} >
                    <MDBCard title={photo.description} className="imgcard">
                        <Photo src={photo.avatar} file={this.state.image} />
                        <MDBCardText>
                            {photo.description}
                        </MDBCardText>
                        {(localStorage.getItem('token')) ? <div>  <i className="far fa-thumbs-up" title="Like"></i> <small>{(photo.likedbyusers).length}</small></div> : ''}
                    </MDBCard>
                </div>

            );
        }.bind(this));
        return (
            <div className="container">
                <h2 className="text-center"><b>photos App to save best shots</b></h2>
                {allPhotos}
            </div>
        )
    }
}
export default Home