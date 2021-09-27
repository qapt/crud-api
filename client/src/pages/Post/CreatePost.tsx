import CreatePostForm from '../../components/Forms/CreatePostForm';
import { Avatar, Container, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useFormContainerStyles } from '../../utils/useFormStyles';

const CreatePost = () => {
    const classes = useFormContainerStyles();
    return (
        <>
            <Container component='main' maxWidth='md'>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AddIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Create Post
                    </Typography>
                    <CreatePostForm />
                </div>
            </Container>
        </>
    );
};

export default CreatePost;
