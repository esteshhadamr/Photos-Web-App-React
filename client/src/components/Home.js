import React from 'react';
import axios from 'axios';
import { MDBCard, MDBCardText } from 'mdbreact';
import { NotificationManager } from 'react-notifications';
import * as _ from 'underscore';
import Photo from './Photo';

// Home Component
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchPhotos();
    }

    // Get all photos from server
    fetchPhotos() {
        axios.get('/api/photos')
            .then(res => {
                this.setState({
                    photos: res.data,
                    isLoading: false
                });
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                });
                NotificationManager.error(err.response.data.message, '', 10000);
            });
    };

    //To check if user already like this photo
    checkUserLikes = (photo, user) => {
        return (photo.likedbyusers.includes(user.id));
    }

    //Handle like button click
    likePhoto = (photo) => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (this.checkUserLikes(photo, user)) {
            NotificationManager.warning('You are already liked this photo', '', 2000);
        }
        else {
            let data = { userId: user.id };
            axios.post('/api/photos/' + photo._id, data)
                .then(res => {
                    // to determine photo index in array & Update likes of it
                    const index = _.indexOf(this.state.photos, photo);
                    this.state.photos[index] = res.data;
                    this.setState({
                        photos: this.state.photos
                    })
                })
                .catch(err => {
                    NotificationManager.error(err.response.data.message, '', 10000);

                });
        }
    }

    render() {
        if (this.state.isLoading) {
            return <div className="spinner-border text-primary" role="status"></div>

        }
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
                        {(localStorage.getItem('user')) ? <div>  <i className="far fa-thumbs-up" title="Like" onClick={() => this.likePhoto(photo)}></i> <small>{(photo.likedbyusers).length}</small></div> : ''}
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