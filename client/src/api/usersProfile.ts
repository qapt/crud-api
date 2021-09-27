import axios from 'axios';
import { useQuery } from 'react-query';

export function useUserProfileData() {
    return useQuery(
        'userProfileData',
        async () => {
            const {
                data: { userProfile },
            } = await axios.get('http://localhost:5000/users/me', {
                withCredentials: true,
            });
            return userProfile;
        },
        { refetchOnWindowFocus: false }
    );
}

export function useUserLikedPosts() {
    return useQuery(
        'userLikedPosts',
        async () => {
            const {
                data: { userLikedPosts },
            } = await axios.get('http://localhost:5000/users/me/likes', {
                withCredentials: true,
            });
            return userLikedPosts;
        },
        { refetchOnWindowFocus: false }
    );
}
