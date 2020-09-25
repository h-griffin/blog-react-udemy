<Route path='/' render={}>
             ^
    does my route start wiht this?

<Route path='/' exact render={}>
                    ^
    is this my exact route?

no exact will render all pages including that path

exact will only render that exact route


<Route path='/' exact component={Posts} />
                            ^ 
                    component vs jsx


<li><a href='/'>Home</a></li>
<li><a href='/new-post'>New Post</a></li>
a tags reload hte page/ send new http request, 
we are already in the single page app and no not need a new request, so we use <Link> absolute path


relative path
pathname: this.props.match.url + '/new-post',
append to end of current path