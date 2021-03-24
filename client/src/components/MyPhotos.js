import React from 'react';
import axios from 'axios';
import { MDBCard, MDBCardText, MDBRow } from 'mdbreact';
import { NotificationManager } from 'react-notifications';
import * as _ from 'underscore';
import Photo from './Photo';
import Pagination from './Pagination'


// MyPhotos Component
class MyPhotos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            currentphotos: [],
            currentPage: null,
            totalPages: null,
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchPhotos();
    }

    // Get all photos from server
    fetchPhotos() {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.get('/api/photos/' + user.id)
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
    }

    //To check if user already like this photo
    checkUserLikes = (photo, user) => {
        return (photo.likedbyusers.includes(user.id));
    };

    //Handle like button click
    handleLike = (photo) => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (this.checkUserLikes(photo, user)) {
            NotificationManager.warning('You are already liked this photo', '', 2000);
        }
        else {
            let data = { userId: user.id };
            axios.post('/api/photos/' + photo._id, data)
                .then(res => {
                    // to determine photo index in array & Update likes of it
                    const index = _.indexOf(this.state.currentphotos, photo);
                    this.state.currentphotos[index] = res.data;
                    this.setState({
                        photos: this.state.photos,
                    })
                })
                .catch(err => {
                    NotificationManager.error(err.response.data.message, '', 10000);
                });
        }
    }

    //Handle Page Change
    onPageChanged = data => {
        this.fetchPhotos()
        const { photos } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentphotos = photos.slice(offset, offset + pageLimit);
        this.setState({ currentPage, currentphotos, totalPages });
    };

    render() {
        const {
            photos,
            currentphotos,
            currentPage,
            totalPages
        } = this.state;
        const totalPhotots = photos.length;
        if (this.state.isLoading) {
            return <div className="spinner-border text-primary" role="status"></div>
        }
        if (photos.length < 1) {
            return (<h3>Upload your first photo </h3>);
        }
        return (
            <div className="container">
                <h3 ><b>My photos </b></h3>
                <MDBRow>
                    {currentphotos.map(photo => (
                        <div key={photo._id} >
                            <MDBCard title={photo.description} className="imgcard">
                                <Photo src={photo.avatar} file={this.state.image} />
                                <MDBCardText>
                                    {photo.description}
                                </MDBCardText>
                                {(localStorage.getItem('user')) ? <div>  <i className="far fa-thumbs-up" title="Like" onClick={() => this.handleLike(photo)}></i> <small>{(photo.likedbyusers).length}</small></div> : ''}
                            </MDBCard>
                        </div>
                    ))}
                </MDBRow>
                <MDBRow className="text-center">
                    <Pagination
                        totalRecords={totalPhotots}
                        pageLimit={12}
                        pageNeighbours={0}
                        onPageChanged={this.onPageChanged}
                    />
                    {currentPage && (
                        <span className="current-page d-inline-block h-100 pl-4">
                            Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                            <span className="font-weight-bold">{totalPages}</span>
                        </span>
                    )}
                </MDBRow>
            </div>
        )
    }
}
export default MyPhotos