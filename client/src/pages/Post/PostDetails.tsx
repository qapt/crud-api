import { useHistory, useParams } from 'react-router';
import { Typography, CircularProgress, Box } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateCommentForm from '../../components/Forms/CreateCommentForm';
import CommentList from '../../components/CommentList';
import PostItem from '../../components/PostItem';
import { usePostById } from '../../api/posts';
import Wrapper from '../../components/Wrapper';

const PostDetails = () => {
    const history = useHistory();
    const { postId } = useParams<any>();
    const { data, error, isLoading, isError }: any = usePostById(postId);

    const handleGoBackAction = () => {
        history.push('/');
    };

    if (isLoading) {
        return (
            <Wrapper>
                <CircularProgress />
            </Wrapper>
        );
    }
    if (isError) {
        return (
            <Wrapper>
                <p>{error.message}</p>
            </Wrapper>
        );
    }

    return (
        <>
            {data.post ? (
                <Wrapper>
                    <Box mt={3}>
                        <ArrowBackIcon
                            style={{ cursor: 'pointer' }}
                            onClick={handleGoBackAction}
                        />
                    </Box>
                    <PostItem post={data.post} />
                    <CreateCommentForm postId={postId} />
                    <CommentList comments={data.post.comments} />
                </Wrapper>
            ) : (
                <Typography>Post not found</Typography>
            )}
        </>
    );
};

export default PostDetails;
