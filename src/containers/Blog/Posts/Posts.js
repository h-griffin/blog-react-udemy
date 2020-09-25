import React, {Component} from 'react';
import axios from '../../../axios';
// import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component{
    state ={
        posts: [],
    }

    //best place for hhtp req
    componentDidMount(){
        // console.log(this.props);
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
                console.log('something went wrong!',error);
                // this.setState({error: true})
            });
    }

    postSelectedHandler = (id) => {
        // this.setState({selectedPostId: id});

        // this.props.history.push({pathname: '/' + id}); //both work 
        this.props.history.push('/' + id);
    }

    render(){
        let posts = <p style={{textAlign: 'center'}}>ERROR! Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => { //map new array
                return (
                    // <Link to={'/' + post.id} key={post.id}>                     
                        <Post 
                            key={post.id} //key in outer element: link
                            title={post.title} 
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link>
                )
            });
        }

        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>


        )
    }
}

export default Posts;