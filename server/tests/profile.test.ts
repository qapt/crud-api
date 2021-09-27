import request from 'supertest';
import app from '../src/app';
import { disconnectDb, dropDatabases } from './utils/db';
import { generateUserCookie } from './utils/generateUserCookie';

let cookie: string;

beforeEach(async () => {
    await dropDatabases();
    cookie = await generateUserCookie();
});

afterAll(async () => {
    await disconnectDb();
});

describe('GET /users/me', () => {
    beforeEach(async () => {
        await request(app)
            .put('/users/profile')
            .set('Cookie', `authToken=${cookie}`)
            .send({})
            .expect(201);
    });

    test('Should 200-OK when getting user profile', async () => {
        await request(app)
            .get('/users/me')
            .set('Cookie', `authToken=${cookie}`)
            .expect(200);
    });

    test('Should 401-Unauthorized when getting unauthorized user profile', async () => {
        await request(app).get('/users/me').expect(401);
    });
});

describe('PUT /users/profile', () => {
    // Sent object can be empty, all values are optional
    test('Should 201-Created when creating or updating user profile', async () => {
        await request(app)
            .put('/users/profile')
            .set('Cookie', `authToken=${cookie}`)
            .send({})
            .expect(201);
    });

    test('Should 401-Unauthorized when creating or updating unauthorized user profile', async () => {
        await request(app).put('/users/profile').send({}).expect(401);
    });
});
