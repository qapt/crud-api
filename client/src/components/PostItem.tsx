import {
    ListItem,
    ListItemText,
    Typography,
    Box,
    Divider,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { formatUserWithDate } from '../utils/formatUserWithDate';
import LikeButton from './LikeButton';

const PostItem = ({ post, listMode }: any) => {
    return (
        <>
            <ListItem alignItems='flex-start'>
                <ListItemText
                    primary={
                        <Typography variant='h4'>
                            {listMode ? (
                                <Link
                                    to={`/posts/${post.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    {post.title}
                                </Link>
                            ) : (
                                <>{post.title}</>
                            )}
                        </Typography>
                    }
                    secondary={
                        <>
                            <Box mb={2}>
                                <Typography variant='body2'>
                                    {formatUserWithDate(
                                        post.author.username,
                                        post.updatedAt
                                    )}
                                </Typography>
                            </Box>
                            <Typography>
                                {listMode ? (
                                    <> {post.content.slice(0, 100) + '...'}</>
                                ) : (
                                    <>{post.content}</>
                                )}
                            </Typography>
                        </>
                    }
                />
                <LikeButton post={post} />

                <div style={{ fontSize: '30px' }}>{post.likes.length}</div>
            </ListItem>
            {listMode && <Divider />}
        </>
    );
};

export default PostItem;
