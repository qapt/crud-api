import request from 'supertest';
import app from '../src/app';
import {
    dropDatabases,
    createUser,
    findUserById,
    disconnectDb,
} from './utils/db';
import { generateUserCookie } from './utils/generateUserCookie';

let cookie: string;

beforeEach(async () => {
    await dropDatabases();
});

afterAll(async () => {
    await disconnectDb();
});

describe('POST /accounts/register', () => {
    test('Should 201-Created when signing up new user', async () => {
        const response = await request(app)
            .post('/accounts/register')
            .send({
                username: 'testuser',
                email: 'testuser@test.com',
                password: '123123123',
                verifyPassword: '123123123',
            })
            .expect(201);

        const userId: string = response.body.data.user.id;
        const user = await findUserById(userId);

        expect(user).not.toBeNull();
    });

    test('Should 400-BadRequest when signing up new user if data is missing', async () => {
        await request(app)
            .post('/accounts/register')
            .send({
                username: 'testuser',
                password: '123123123',
                verifyPassword: '123123123',
            })
            .expect(400);
    });
});

describe('POST /accounts/login', () => {
    beforeEach(async () => {
        await createUser();
    });

    test('Shoud 200-OK when logging in existing user', async () => {
        await request(app)
            .post('/accounts/login')
            .send({
                username: 'bob',
                password: '123123123',
            })
            .expect(200);
    });

    test('Should 401-Unauthorized when logging in using bad credentials', async () => {
        await request(app)
            .post('/accounts/login')
            .send({
                username: 'bob',
                password: '123',
            })
            .expect(401);
    });
});

describe('GET /accounts/logout', () => {
    beforeEach(async () => {
        cookie = await generateUserCookie();
    });

    test('Should 200-OK when logging out user', async () => {
        await request(app)
            .get('/accounts/logout')
            .set('Cookie', `authToken=${cookie}`)
            .expect(200);
    });
});
