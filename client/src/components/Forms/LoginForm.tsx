import FormErrors from './FormErrors';

import { TextField, Button, Grid, Link } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useFormStyles } from '../../utils/useFormStyles';
import { useLoginUser } from '../../api/users';

const LoginForm = () => {
    const classes = useFormStyles();
    const [errors, setErrors] = useState<string[]>([]);
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const loginUserMutation = useLoginUser();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const loginData = { username, password };
        loginUserMutation.mutate(loginData);
    };

    useEffect(() => {
        if (loginUserMutation.data && loginUserMutation.data.isAxiosError) {
            setErrors(loginUserMutation.data.response.data.error.details);
        }
    }, [loginUserMutation.data]);

    return (
        <>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='username'
                    label='Username'
                    name='username'
                    type='text'
                    autoComplete='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <FormErrors errors={errors} />

                <Grid container>
                    <Grid item xs>
                        <Link href='#' variant='body2'>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href='/accounts/register' variant='body2'>
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default LoginForm;
