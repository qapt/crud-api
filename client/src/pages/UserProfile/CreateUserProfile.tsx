import { Container, Typography } from '@material-ui/core';
import { useFormContainerStyles } from '../../utils/useFormStyles';
import CreateUserProfileForm from '../../components/Forms/CreateUserProfileForm';
import { useCurrentUser } from '../../api/users';
import { useHistory } from 'react-router';

const CreateUserProfile = () => {
    const classes = useFormContainerStyles();
    const history = useHistory();
    const { data, isError, isLoading }: any = useCurrentUser();

    if (!isLoading && !isError && !data.loggedIn) {
        history.push('/');
    }

    return (
        <>
            <Container component='main' maxWidth='sm'>
                <div className={classes.paper}>
                    <Typography component='h1' variant='h5'>
                        Create Profile
                    </Typography>
                    <CreateUserProfileForm />
                </div>
            </Container>
        </>
    );
};

export default CreateUserProfile;
