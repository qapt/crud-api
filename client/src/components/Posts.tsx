import { List } from '@material-ui/core';

import PostItem from './PostItem';

const Posts = ({ posts }: any) => {
    return (
        <List>
            {posts.map((post: any) => (
                <PostItem key={post.id} post={post} listMode />
            ))}
        </List>
    );
};

export default Posts;
