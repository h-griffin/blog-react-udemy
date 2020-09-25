import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    }

    componentDidMount(){
        console.log('[fullpost] component did mount', this.props)
        this.loadData();
    }   

    componentDidUpdate(){
        this.loadData();
    }

    loadData(){
        //set state inside didupdate makes infinite update loop
        if(this.props.match.params.id){
            // if no post or we do but id is new/different                            num      != +num     str
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {
                axios.get('/posts/' + this.props.match.params.id) //base url >> index.js
                    .then(response => {
                        // console.log(response);
                        this.setState({loadedPost: response.data});
                    })
            }
        }
    }

    deletePostHandler= () => {
        axios.delete('/posts/' + this.props.match.params.id) //base url >> index.js
            .then(response => {
                console.log('[deletePostHandler] deleted!', response);
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        // if post is found (data not ready)
        if (this.props.match.params.id){
            post = <p style={{textAlign: 'center'}}>Loading...</p>
        }

        // if data from post is ready/gathered
        if (this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

        );
        }
        return post;
    }
}

export default FullPost;