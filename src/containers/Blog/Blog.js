import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
// import axios from 'axios';
import axios from '../../axios'; //instance

class Blog extends Component {
    state ={
        posts: [],
        selectedPostId: null,
        error: false,
    }

    //best place for hhtp req
    componentDidMount(){
        axios.get('/posts') //base url >> index.js
            .then(response => {
                const posts = response.data.slice(0, 4); //store only 4 posts
                const updatedPosts = posts.map(post=>{
                    return{
                        ...post,
                        author: 'griffin'
                    }
                })
                // this.setState({posts: response.data}); // returns all posts /inside .then so you have the data first
                this.setState({posts: updatedPosts})
            })
            .catch(error => {
                // console.log('something went wrong!',error);
                this.setState({error: true})
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
            let posts = <p style={{textAlign: 'center'}}>ERROR! Something went wrong!</p>;
            if (!this.state.error) {
                posts = this.state.posts.map(post => { //map new array
                    return <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />;
                });
            }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;