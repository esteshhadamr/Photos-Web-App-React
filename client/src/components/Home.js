import React from 'react';

// Home Component
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos:[],
            error: '',
            isLoading: false
        };
    }

    render() {
        if (this.state.isLoading) {
            return (<h3>Please Wait while load photos</h3>);
        }

        if (this.state.error) {
            return (<blockquote>{this.state.error}</blockquote>);
        }

        if (this.state.photos.length < 1) {
            return (<h3>no photos to show </h3>);
        }

 
    }
}
export default Home