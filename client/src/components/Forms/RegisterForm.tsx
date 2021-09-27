import { Button, Grid, TextField, Link } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useRegisterUser } from '../../api/users';
import { useFormStyles } from '../../utils/useFormStyles';
import FormErrors from './FormErrors';

const RegisterForm = () => {
    const classes = useFormStyles();
    const [errors, setErrors] = useState<string[]>([]);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [verifyPassword, setVerifyPassword] = useState<string>('');
    const registerUserMutation = useRegisterUser();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const newUser = { username, email, password, verifyPassword };
        registerUserMutation.mutate(newUser);
    };

    useEffect(() => {
        if (
            registerUserMutation.data &&
            registerUserMutation.data.isAxiosError
        ) {
            setErrors(registerUserMutation.data.response.data.error.details);
        }
    }, [registerUserMutation.data]);

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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='verifyPassword'
                    label='Verify Password'
                    id='verifyPassword'
                    type='password'
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                />

                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <FormErrors errors={errors} />
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Link href='/accounts/login' variant='body2'>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default RegisterForm;
