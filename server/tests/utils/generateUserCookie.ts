import request from 'supertest';
import app from '../../src/app';

export const generateUserCookie = async (): Promise<string> => {
    const response = await request(app).post('/accounts/register').send({
        username: 'test',
        email: 'test@test.com',
        password: '123123123',
        verifyPassword: '123123123',
    });

    const string = response.headers['set-cookie'][0];
    const cookie = string.split('authToken=').pop().split(';')[0];

    return cookie;
};
