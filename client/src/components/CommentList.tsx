import { Box, ListItem, ListItemText, Typography } from '@material-ui/core';
import { formatUserWithDate } from '../utils/formatUserWithDate';

const CommentList = ({ comments }: any) => {
    return (
        <>
            {comments.map((comment: any) => (
                <ListItem key={comment.id} alignItems='flex-start' divider>
                    <ListItemText
                        primary={
                            <Typography variant='body1'>
                                {comment.content}
                            </Typography>
                        }
                        secondary={
                            <>
                                <Box mb={2}>
                                    <Typography variant='body2'>
                                        {formatUserWithDate(
                                            comment.author.username,
                                            comment.updatedAt
                                        )}
                                    </Typography>
                                </Box>
                            </>
                        }
                    />
                </ListItem>
            ))}
        </>
    );
};

export default CommentList;
