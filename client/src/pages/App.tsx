import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// Components
import { NavBar } from '../components/NavBar';

// Pages
import PostList from './Post/PostList';
import CreatePost from './Post/CreatePost';
import Register from './Auth/Register';
import Login from './Auth/Login';
import PostDetails from './Post/PostDetails';
import UserProfile from './UserProfile/UserProfile';
import CreateUserProfile from './UserProfile/CreateUserProfile';
import CreatePostButton from '../components/CreatePostButton';

// TODO: base api url for axios fetching
const queryClient = new QueryClient();

const App = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <NavBar />
                    <Switch>
                        <Route exact path='/' component={PostList} />
                        <Route
                            path='/posts/create-post'
                            component={CreatePost}
                        />
                        <Route path='/posts/:postId' component={PostDetails} />
                        <Route path='/accounts/me' component={UserProfile} />
                        <Route
                            path='/accounts/profile'
                            component={CreateUserProfile}
                        />
                        <Route path='/accounts/register' component={Register} />
                        <Route path='/accounts/login' component={Login} />
                    </Switch>
                    <CreatePostButton />
                </Router>
            </QueryClientProvider>
        </>
    );
};

export default App;
