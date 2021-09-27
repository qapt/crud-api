import { NotFound, ServerError } from './../../errors/index';
import { prisma } from '../../db';

export const getAllPosts = async (skip: number, searchTerm: string) => {
    const [posts, totalPosts] = await prisma.$transaction([
        prisma.post.findMany({
            include: {
                author: { select: { username: true } },
                likes: { select: { userId: true } },
            },
            skip,
            take: 5,
            orderBy: { createdAt: 'desc' },
            where: {
                title: { contains: searchTerm, mode: 'insensitive' },
            },
        }),
        prisma.post.count({
            where: {
                title: { contains: searchTerm, mode: 'insensitive' },
            },
        }),
        prisma.like.count(),
    ]);

    if (!posts) throw new NotFound(['Posts not found']);
    return [posts, totalPosts];
};

export const findPostById = async (id: string) => {
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: { select: { username: true } },
            comments: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    author: { select: { username: true } },
                },
                orderBy: { updatedAt: 'desc' },
            },
            likes: { select: { userId: true } },
        },
    });

    if (!post) throw new NotFound(['Unable to find a post with specified id']);
    return post;
};

export const createPost = async ({ title, content, userId }: PostInput) => {
    const post = await prisma.post.create({
        data: {
            title,
            content,
            author: {
                connect: { id: userId },
            },
        },
        include: { author: { select: { username: true } } },
    });

    if (!post) throw new ServerError();
    return post;
};

export const deletePost = async (id: string) => {
    await prisma.like.deleteMany({ where: { postId: id } });
    await prisma.comment.deleteMany({ where: { postId: id } });
    await findPostById(id);

    const deletedPost = await prisma.post.delete({
        where: { id },
        select: { id: true, title: true, content: true },
    });
    if (!deletedPost) throw new ServerError();
    return deletedPost;
};

export const likePost = async (postId: string, userId: string) => {
    const alreadyLiked = await prisma.like.findFirst({
        where: {
            postId,
            userId,
        },
    });

    if (alreadyLiked) {
        const dislikedPost = await prisma.like.delete({
            where: { id: alreadyLiked.id },
            include: {
                author: { select: { username: true } },
            },
        });
        return [dislikedPost, 'Post disliked successfully'];
    }

    const likedPost = await prisma.like.create({
        data: {
            userId,
            postId,
        },
        include: {
            author: { select: { username: true } },
        },
    });

    return [likedPost, 'Post liked successfully'];
};
