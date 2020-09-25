import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import AsyncComponent from '../../hoc/asyncComponent';
import asyncComponent from '../../hoc/asyncComponent';

// import NewPost from './NewPost/NewPost';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
    //only load when needed/ called
});
 

class Blog extends Component {
    state={
        auth: true,
    }

    render () {

        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to='/' 
                                exact
                                activeClassName='my-active'
                                activeStyle={{
                                    color: 'fa923f',
                                    textDecoration: 'underline',
                                }}
                                >Posts</NavLink></li>

                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/* <Route path='/' exact render={() => <Posts />} /> */}

                {/* SWITCH: render onlu one route / GUARD: not sure if authenticated*/}
                <Switch> 
                    { this.state.auth ? <Route path='/new-post' component={AsyncNewPost} /> : null } 
                    <Route path='/posts' component={Posts} />

                    <Route render={() => <h1>not found, unknown route</h1>} />
                    {/* <Redirect from ='/' to='/posts' /> */}

                    {/* <Route path='/posts/:id' exact component={FullPost} /> */}
                    {/* <Route path='/:id' exact component={FullPost} /> */}

                </Switch>

            </div>
        );
    }
}

export default Blog;