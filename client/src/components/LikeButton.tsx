import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useEffect, useState } from 'react';
import { useLikePostMutation } from '../api/posts';
import { useCurrentUser } from '../api/users';
import { useHistory } from 'react-router-dom';

const LikeButton = ({ post }: any) => {
    let history = useHistory();
    const [fullIcon, setFullIcon] = useState<any>(false);
    const { data }: any = useCurrentUser();
    const likePostMutation = useLikePostMutation();

    useEffect(() => {
        if (data.loggedIn) {
            JSON.stringify(post.likes).includes(data.user.id)
                ? setFullIcon(true)
                : setFullIcon(false);
        }
    }, [data, post.likes]);

    const handleLike = async () => {
        if (!data.loggedIn) {
            history.push('/accounts/login');
        }
        setFullIcon((toggle: any) => !toggle);
        likePostMutation.mutate(post.id);
    };

    return (
        <>
            <div
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={handleLike}
            >
                {fullIcon ? (
                    <FavoriteIcon fontSize='large' />
                ) : (
                    <FavoriteBorderIcon fontSize='large' />
                )}
            </div>
        </>
    );
};

export default LikeButton;
