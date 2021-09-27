import LoginForm from '../../components/Forms/LoginForm';
import { Container, Typography, Avatar } from '@material-ui/core';
import { LockOutlined as LockIcon } from '@material-ui/icons';
import { useFormContainerStyles } from '../../utils/useFormStyles';
import { useHistory } from 'react-router';
import { useCurrentUser } from '../../api/users';

const Login = () => {
    const classes = useFormContainerStyles();
    const history = useHistory();
    const { data, isError, isLoading }: any = useCurrentUser();

    if (!isLoading && !isError && data.loggedIn) {
        history.push('/accounts/me');
    }

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <LoginForm />
            </div>
        </Container>
    );
};

export default Login;
