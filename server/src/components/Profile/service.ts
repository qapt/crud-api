import { prisma } from '../../db';
import { NotFound, ServerError } from './../../errors/index';

export const findUserProfileById = async (userId: string) => {
    const userProfile = await prisma.profile.findUnique({
        where: { userId },
        include: {
            user: {
                select: {
                    username: true,
                    email: true,
                    posts: {
                        select: {
                            id: true,
                            title: true,
                            content: true,
                            updatedAt: true,
                            author: { select: { username: true } },
                            likes: true,
                        },
                        orderBy: { updatedAt: 'desc' },
                    },
                },
            },
        },
    });
    if (!userProfile) throw new NotFound(['User profile not found']);
    return userProfile;
};

export const findUserLikedPosts = async (userId: string) => {
    const likedPosts = await prisma.post.findMany({
        where: { likes: { some: { userId: { equals: userId } } } },
        include: { author: { select: { username: true } }, likes: true },
    });
    if (!likedPosts) throw new NotFound(['No liked posts found']);
    return likedPosts;
};

export const createOrUpdateProfile = async ({
    userId,
    firstName,
    lastName,
    bio,
    twitterUrl,
    githubUrl,
    websiteUrl,
}: CreateProfileInput) => {
    const profile = await prisma.profile.upsert({
        where: { userId },
        create: {
            user: {
                connect: { id: userId },
            },
            firstName,
            lastName,
            bio,
            twitterUrl,
            githubUrl,
            websiteUrl,
        },
        update: {
            firstName,
            lastName,
            bio,
            twitterUrl,
            githubUrl,
            websiteUrl,
        },
        include: {
            user: {
                select: {
                    username: true,
                    email: true,
                },
            },
        },
    });

    if (!profile) throw new ServerError();
    return profile;
};
