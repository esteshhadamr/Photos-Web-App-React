import React from 'react';
import axios from 'axios';
import { MDBCard, MDBCardText, MDBRow } from 'mdbreact';
import { NotificationManager } from 'react-notifications';
import * as _ from 'underscore';
import Photo from './Photo';
import Pagination from './Pagination'

// Home Component
class Home extends React.Component {

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
                        photos: this.state.photos,
                        currentphotos: this.state.photos
                    })
                })
                .catch(err => {
                    NotificationManager.error(err.response.data.message, '', 10000);

                });
        }
    }
    onPageChanged = data => {
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
        
        const headerClass = [
            "text-dark py-2 pr-4 m-0",
            currentPage ? "border-gray border-right" : ""
        ]
            .join(" ")
            .trim();

        if (this.state.isLoading) {
            return <div className="spinner-border text-primary" role="status"></div>

        }
        if (this.state.photos.length < 1) {
            return (<h3>no photos to show </h3>);
        }

        return (
            <div className="container">
                <h2 className="text-center"><b>photos App to save best shots</b></h2>
                <MDBRow>
                    {currentphotos.map(photo => (
                        <div key={photo._id} >
                            <MDBCard title={photo.description} className="imgcard">
                                <Photo src={photo.avatar} file={this.state.image} />
                                <MDBCardText>
                                    {photo.description}
                                </MDBCardText>
                                {(localStorage.getItem('user')) ? <div>  <i className="far fa-thumbs-up" title="Like" onClick={() => this.likePhoto(photo)}></i> <small>{(photo.likedbyusers).length}</small></div> : ''}
                            </MDBCard>
                        </div>
                    ))}
                </MDBRow>
                {(totalPhotots > 12) ?
                    <MDBRow className="text-center">
                        <Pagination
                            totalRecords={totalPhotots}
                            pageLimit={12}
                            pageNeighbours={1}
                            onPageChanged={this.onPageChanged}
                        />
                        {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4">
                                Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                                <span className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}
                    </MDBRow>
                    : ''}
            </div>
        )
    }
}
export default Home