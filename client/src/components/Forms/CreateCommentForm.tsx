import { useEffect, useState } from 'react';
import { useFormStyles } from '../../utils/useFormStyles';
import { TextField, Button } from '@material-ui/core';
import FormErrors from './FormErrors';
import { useCreateCommentMutation } from '../../api/posts';

const CreateCommentForm = ({ postId }: any) => {
    const classes = useFormStyles();
    const [errors, setErrors] = useState<string[]>([]);
    const [content, setContent] = useState<string>('');
    const createCommentMutation = useCreateCommentMutation();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newComment = { postId, content };
        createCommentMutation.mutate(newComment);
    };
    useEffect(() => {
        if (
            createCommentMutation.data &&
            createCommentMutation.data.isAxiosError
        ) {
            setErrors(createCommentMutation.data.response.data.error.details);
        }
    }, [createCommentMutation.data]);

    return (
        <>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='content'
                    label='Comment'
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
        </>
    );
};

export default CreateCommentForm;
