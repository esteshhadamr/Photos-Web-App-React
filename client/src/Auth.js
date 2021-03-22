import axios from 'axios';

const Auth = {

    //Initialize axios headers.
    init: () => {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.defaults.headers.common['Authorization'] = user !== null ? user.token : '';
    },

    //Store user data after login in localStorage.
    login: user => {
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = user.token;
    },

    // Delete user data from localStorage . 
    logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('user');
        localStorage.removeItem('user_data');

    },

    /** Is user authenticated
     * @returns {boolean}
    */
    auth: () => localStorage.getItem('user') !== null,

    /**
     * Is guest.
     * @returns {boolean}
     */
    guest: () => localStorage.getItem('user') === null,

    // Get user token.
    getToken: () => {
        let user = JSON.parse(localStorage.getItem('user'));
        return user !== null ? user.token : '';
    },

    // Set user
    setUser: (newProfile) => {
        let user = JSON.parse(localStorage.getItem('user'));
        newProfile.token = user.token;
        localStorage.setItem('user', JSON.stringify(newProfile));
    },

};

export default Auth;