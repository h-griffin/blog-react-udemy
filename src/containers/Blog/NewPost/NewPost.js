import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Griffin',
        submitted: false,
    }

    componentDidMount(){
        // if unauth => this.props.history.replace('/posts');
        console.log(this.props);
    }

    postDataHandler= () =>{
        const data ={
            title: this.state.title,
            body: this.state.content,
            author: this.state.author,
        }
        axios.post('/posts', data) //base url >> index.js
            .then(response => {
                console.log('[postDataHandler] Posted!',response);
                this.props.history.push('/posts') // redirects after submit
                this.props.history.replace('/posts') //replaces after submit

                this.setState({submitted: true});
            })
    }

    render () {
        let redirect = null;
        if (this.state.submitted){
            redirect = <Redirect to='/posts' /> // replaces page on stack, cant go back
        }

        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Griffin">Griffin</option>
                    <option value="Bryce">Bryce</option>
                    <option value="Hunter">Hunter</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;