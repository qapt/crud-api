import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000/posts';

export function usePaginatedPosts(
    searchTerm: string,
    nextSkip: number,
    page: number
) {
    return useQuery(
        ['posts', page, nextSkip, searchTerm],
        async () => {
            try {
                const { data } = await axios.get(
                    `${BASE_URL}?q=${searchTerm}&skip=${nextSkip}`
                );
                return data;
            } catch (err) {
                throw new Error('Error fetching posts. Please try again.');
            }
        },
        { refetchOnWindowFocus: false }
    );
}

export function usePostById(postId: string) {
    return useQuery(['post', postId], async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/${postId}`);
            return data;
        } catch (err) {
            throw new Error('Error fetching post. Please try again.');
        }
    });
}

export function useCreatePostMutation() {
    const history = useHistory();
    return useMutation(async ({ title, content }: any) => {
        try {
            await axios.post(
                'http://localhost:5000/posts',
                {
                    title,
                    content,
                },
                { withCredentials: true }
            );
            history.push('/');
        } catch (error) {
            return error;
        }
    });
}

export function useCreateCommentMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ postId, content }: any) => {
            try {
                await axios.post(
                    `http://localhost:5000/posts/${postId}/comment`,
                    {
                        content,
                    },
                    { withCredentials: true }
                );
            } catch (error) {
                return error;
            }
        },
        {
            onSuccess: () => queryClient.invalidateQueries('post'),
        }
    );
}

export function useLikePostMutation() {
    const queryClient = useQueryClient();

    return useMutation(
        (postId) =>
            axios.put(
                `http://localhost:5000/posts/${postId}/like`,
                {},
                { withCredentials: true }
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('posts');
                queryClient.invalidateQueries('post');
                queryClient.invalidateQueries('userProfileData');
                queryClient.invalidateQueries('userLikedPosts');
            },
        }
    );
}
