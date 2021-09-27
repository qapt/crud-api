import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../src/components/Auth/utils/hashPassword';

const prisma = new PrismaClient();

export const disconnectDb = async () => {
    await prisma.$disconnect();
};

export const dropDatabases = async () => {
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
};

export const createUser = async () => {
    const userOne = {
        username: 'bob',
        email: 'bob@bob.com',
        password: '123123123',
    };

    await prisma.user.create({
        data: {
            username: userOne.username,
            email: userOne.email,
            password: await hashPassword(userOne.password),
        },
    });
};

export const findUserById = async (userId: string) => {
    return await prisma.user.findUnique({
        where: { id: userId },
    });
};
