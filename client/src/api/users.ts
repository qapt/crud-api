import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const BASE_URL = 'http://localhost:5000/accounts';

export function useCurrentUser() {
    return useQuery(
        'currentUser',
        async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}`, {
                    withCredentials: true,
                });
                return data;
            } catch (err) {
                throw new Error('Error fetching user. Please try again.');
            }
        },
        { refetchOnWindowFocus: false }
    );
}

export function useRegisterUser() {
    const queryClient = useQueryClient();
    const history = useHistory();

    return useMutation(
        async ({ username, email, password, verifyPassword }: any) => {
            try {
                await axios.post(
                    'http://localhost:5000/accounts/register',
                    {
                        username,
                        email,
                        password,
                        verifyPassword,
                    },
                    { withCredentials: true }
                );
                history.push('/accounts/profile');
            } catch (error) {
                return error;
            }
        },
        { onSuccess: () => queryClient.invalidateQueries('currentUser') }
    );
}

export function useLoginUser() {
    const queryClient = useQueryClient();
    const history = useHistory();

    return useMutation(
        async ({ username, password }: any) => {
            try {
                await axios.post(
                    'http://localhost:5000/accounts/login',
                    {
                        username,
                        password,
                    },
                    { withCredentials: true }
                );
                history.push('/');
            } catch (error) {
                return error;
            }
        },
        { onSuccess: () => queryClient.invalidateQueries('currentUser') }
    );
}
