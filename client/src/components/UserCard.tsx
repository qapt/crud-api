import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const UserCard = ({ userData }: any) => {
    return (
        <Box mt={8}>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {userData.firstName} {userData.lastName} (
                            {userData.websiteUrl})
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardContent>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                    >
                        {userData.bio}
                    </Typography>
                </CardContent>
                <CardActions style={{ float: 'right' }}>
                    <Button size='small' color='primary'>
                        <Link
                            to='/accounts/profile'
                            style={{ textDecoration: 'none' }}
                        >
                            Edit Profile
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default UserCard;
