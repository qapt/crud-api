import FormErrors from './FormErrors';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useFormStyles } from '../../utils/useFormStyles';
import { useCreatePostMutation } from '../../api/posts';

const CreatePostForm = () => {
    const classes = useFormStyles();
    const [errors, setErrors] = useState<string[]>([]);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const createPostMutation = useCreatePostMutation();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newPost = { title, content };
        createPostMutation.mutate(newPost);
    };
    useEffect(() => {
        if (createPostMutation.data && createPostMutation.data.isAxiosError) {
            setErrors(createPostMutation.data.response.data.error.details);
        }
    }, [createPostMutation.data]);

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='title'
                label='Title'
                name='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                multiline
                rows={12}
                name='content'
                label='Post content'
                type='text'
                id='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
            >
                Submit
            </Button>
            <FormErrors errors={errors} />
        </form>
    );
};

export default CreatePostForm;
