import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';


// DEFAULT GLOBAL CONFIGS

// url is alwasy the same in entire application

//instance if not every url will be the same >>> axios.js
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';



//shared in all files / any request from any file
axios.interceptors.request.use(request => {
    console.log(request);
    // edit request config before 
    return request; //if no return it blocks the request
}, error => {
    console.log(error);
    return Promise.reject(error); //for local task to show something about the error
});

axios.interceptors.response.use(response => {
    console.log(response);
    return response; 
}, error => {
    console.log(error);
    return Promise.reject(error); //for local task to show something about the error
})

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
