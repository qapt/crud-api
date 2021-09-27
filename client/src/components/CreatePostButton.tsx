import { Link } from 'react-router-dom';
import { useCreatePostButtonStyles } from '../utils/useFormStyles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const CreatePostButton = () => {
    const classes = useCreatePostButtonStyles();
    return (
        <div>
            <Link className={classes.fab} to='/posts/create-post'>
                <AddCircleIcon color='primary' style={{ fontSize: '80px' }} />
            </Link>
        </div>
    );
};

export default CreatePostButton;
