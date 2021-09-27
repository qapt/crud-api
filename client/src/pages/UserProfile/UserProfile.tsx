import { AppBar, Container, Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useCurrentUser } from '../../api/users';
import { useUserLikedPosts, useUserProfileData } from '../../api/usersProfile';
import Posts from '../../components/Posts';
import UserCard from '../../components/UserCard';

const UserProfile = () => {
    const [value, setValue] = useState(0);

    const history = useHistory();
    const { data, isError, isLoading }: any = useCurrentUser();

    if (!isLoading && !isError && !data.loggedIn) {
        history.push('/');
    }

    const { data: userData } = useUserProfileData();
    const { data: userLikedPosts } = useUserLikedPosts();

    const handleTabs = (event: any, value: any) => {
        setValue(value);
    };

    return (
        <>
            <Container component='main' maxWidth='md'>
                {userData && <UserCard userData={userData} />}

                <AppBar position='static'>
                    <Tabs value={value} onChange={handleTabs}>
                        <Tab label='Posts' />
                        <Tab label='Liked Posts' />
                        <Tab label='Media' />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    {userData && <Posts posts={userData.user.posts} />}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {userLikedPosts && <Posts posts={userLikedPosts} />}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Media
                </TabPanel>
            </Container>
        </>
    );
};

const TabPanel = (props: any) => {
    const { children, value, index } = props;

    return <>{value === index && <div>{children}</div>}</>;
};

export default UserProfile;
