import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useFormStyles } from '../../utils/useFormStyles';
import { Button, TextField } from '@material-ui/core';
import FormErrors from './FormErrors';
import { useUserProfileData } from '../../api/usersProfile';

const CreateUserProfileForm = () => {
    let history = useHistory();
    const classes = useFormStyles();

    const { data: userData } = useUserProfileData();

    const [errors, setErrors] = useState<string[]>([]);
    const [firstName, setFirstName] = useState<string>(userData.firstName);
    const [lastName, setLastName] = useState<string>(userData.lastName);
    const [bio, setBio] = useState<string>(userData.bio);
    const [websiteUrl, setWebsiteUrl] = useState<string>(userData.websiteUrl);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.put(
                'http://localhost:5000/users/profile',
                {
                    firstName,
                    lastName,
                    bio,
                    websiteUrl,
                },
                { withCredentials: true }
            );
            history.push('/accounts/me');
        } catch (error) {
            setErrors(error.response.data.error.details);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='firstName'
                label='First Name'
                name='firstName'
                type='text'
                value={firstName}
                placeholder='hello'
                onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                multiline
                rows={4}
                id='bio'
                label='Bio'
                name='bio'
                type='text'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='websiteUrl'
                label='Website'
                name='websiteUrl'
                type='text'
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
            />

            <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
            >
                Submit
            </Button>
            <FormErrors errors={errors} />
        </form>
    );
};

export default CreateUserProfileForm;
