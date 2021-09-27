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

describe('POST /posts/:id/comment', () => {
    test('Should 201-Created when creating new comment ', async () => {
        await request(app)
            .post(`/posts/${postId}/comment`)
            .set('Cookie', `authToken=${cookie}`)
            .send({
                content: 'comment content',
            })
            .expect(201);
    });

    test('Should 401-Unauthorized when creating comment if not auth', async () => {
        await request(app)
            .post(`/posts/${postId}/comment`)
            .send({
                content: 'comment content',
            })
            .expect(401);
    });

    test('Should 404-NotFound when creating comment if parent post doesnt exist', async () => {
        await request(app)
            .post('/posts/123/comment')
            .set('Cookie', `authToken=${cookie}`)
            .send({
                content: 'comment content',
            })
            .expect(404);
    });

    test('Should 400-BadRequest if comment data is missing', async () => {
        await request(app)
            .post(`/posts/${postId}/comment`)
            .set('Cookie', `authToken=${cookie}`)
            .expect(400);
    });
});
