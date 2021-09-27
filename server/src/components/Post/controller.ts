import { NextFunction, Request, Response } from 'express';
import * as PostService from './service';
import { AUTH_TOKEN } from './../../utils/constants';

export const getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { skip, q } = req.query;
    let intSkip = 0;
    let searchTerm = '';

    if (skip) intSkip = +skip;
    if (q) searchTerm = '' + q + '';
    try {
        const [posts, totalPosts] = await PostService.getAllPosts(
            intSkip,
            searchTerm
        );
        res.json({
            message: 'All posts',
            posts,
            totalPosts,
        });
    } catch (error) {
        next(error);
    }
};

export const getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const post = await PostService.findPostById(id);
        res.json({
            message: 'Post by ID',
            post,
        });
    } catch (error) {
        next(error);
    }
};

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, content } = req.body;
    const userId = req.signedCookies[AUTH_TOKEN];

    const postToBeAdded: PostInput = {
        title,
        content,
        userId,
    };

    try {
        const createdPost = await PostService.createPost(postToBeAdded);
        res.status(201).json({
            message: 'Post created successfully',
            post: createdPost,
        });
    } catch (error) {
        next(error);
    }
};

// TODO: update post functionality
export const updatePost = (req: Request, res: Response) => {};

export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const deletedPost = await PostService.deletePost(id);

        res.json({
            message: 'Post deleted successfully',
            post: deletedPost,
        });
    } catch (error) {
        next(error);
    }
};

export const likePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const userId = req.signedCookies[AUTH_TOKEN];

    try {
        const [post, message] = await PostService.likePost(id, userId);
        res.status(201).json({
            message,
            post,
        });
    } catch (error) {
        next(error);
    }
};
