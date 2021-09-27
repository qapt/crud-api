import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Toolbar,
    Button,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import EcoIcon from '@material-ui/icons/Eco';
import { useNavBarStyles } from '../utils/useFormStyles';
import { useCurrentUser } from '../api/users';

export const NavBar = () => {
    const classes = useNavBarStyles();
    const { data, error, isError, isLoading, refetch }: any = useCurrentUser();

    const handleLogout = async () => {
        await axios.get('http://localhost:5000/accounts/logout', {
            withCredentials: true,
        });
        refetch();
    };

    if (isLoading) {
        return <CircularProgress />;
    }
    if (isError) {
        return <p>{error.message}</p>;
    }

    return (
        <>
            <Toolbar className={classes.toolbar}>
                <Button size='large'>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <EcoIcon style={{ fontSize: '50px' }} color='primary' />
                    </Link>
                </Button>
                <Typography
                    variant='h5'
                    color='inherit'
                    align='center'
                    noWrap
                    className={classes.toolbarTitle}
                ></Typography>

                {data.loggedIn ? (
                    <>
                        <Button size='small'>
                            <p>{data.user.username}</p>
                            <Link to='/accounts/me'>
                                <AccountCircleIcon />
                            </Link>
                        </Button>
                        <Button
                            color='secondary'
                            variant='contained'
                            size='small'
                            onClick={handleLogout}
                        >
                            <Link
                                to='/'
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                Logout
                            </Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button size='small'>
                            <Link
                                to='/accounts/register'
                                style={{ textDecoration: 'none' }}
                            >
                                Sign up
                            </Link>
                        </Button>
                        <Button
                            color='primary'
                            variant='contained'
                            size='small'
                        >
                            <Link
                                to='/accounts/login'
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                Sign In
                            </Link>
                        </Button>
                    </>
                )}
            </Toolbar>
        </>
    );
};
