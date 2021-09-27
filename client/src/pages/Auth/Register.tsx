import { Container, Avatar, Typography } from '@material-ui/core';
import { LockOutlined as LockIcon } from '@material-ui/icons';
import { useCurrentUser } from '../../api/users';

import RegisterForm from '../../components/Forms/RegisterForm';
import { useFormContainerStyles } from '../../utils/useFormStyles';
import { useHistory } from 'react-router-dom';

const Register = () => {
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
                    Sign up
                </Typography>
                <RegisterForm />
            </div>
        </Container>
    );
};

export default Register;
