import request from 'supertest';
import app from '../src/app';

import { generateUserCookie } from './utils/generateUserCookie';
import { dropDatabases, disconnectDb } from './utils/db';

let cookie: string;
let postId: string;

beforeEach(async () => {
    await dropDatabases();
    cookie = await generateUserCookie();

    const response = await request(app)
        .post('/posts')
        .set('Cookie', `authToken=${cookie}`)
        .send({
            title: 'title',
            content: 'content',
        });

    postId = response.body.data.post.id;
});

afterAll(async () => {
    await disconnectDb();
});

describe('GET /posts', () => {
    test('Should 200-OK getting all posts', async () => {
        await request(app).get('/posts').expect(200);
    });

    test('Should 200-OK getting post by id if it exists', async () => {
        await request(app).get(`/posts/${postId}`).expect(200);
    });

    test('Should 404-NotFound getting post by id if it does not exist', async () => {
        await request(app).get('/posts/1234').expect(404);
    });
});

describe('POST /posts', () => {
    test('Should 201-Created when creating new post', async () => {
        await request(app)
            .post('/posts')
            .set('Cookie', `authToken=${cookie}`)
            .send({
                title: 'title',
                content: 'content',
            })
            .expect(201);
    });

    test('Should 401-Unauthorized when creating new post if not auth', async () => {
        await request(app)
            .post('/posts')
            .send({
                title: 'title',
                content: 'content',
            })
            .expect(401);
    });

    test('Should 400-BadRequest when creating new post if post data is missing', async () => {
        await request(app)
            .post('/posts')
            .set('Cookie', `authToken=${cookie}`)
            .send({ title: 'title' })
            .expect(400);
    });
});

describe('DELETE /posts/:id', () => {
    test('Should 200-OK when deleting post', async () => {
        await request(app)
            .delete(`/posts/${postId}`)
            .set('Cookie', `authToken=${cookie}`)
            .expect(200);
    });

    test('Should 401-Unauthorized when deleting post if not auth', async () => {
        await request(app).delete(`/posts/${postId}`).expect(401);
    });

    test('Should 404-NotFound when deleting a post that does not exist', async () => {
        await request(app)
            .delete('/posts/1234')
            .set('Cookie', `authToken=${cookie}`)
            .expect(404);
    });
});
