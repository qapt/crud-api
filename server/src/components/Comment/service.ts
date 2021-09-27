import { prisma } from '../../db';
import { NotFound, ServerError } from './../../errors';

export const createComment = async ({
    content,
    userId,
    postId,
}: CommentInput) => {
    const post = await prisma.post.findUnique({
        where: { id: postId },
    });
    if (!post) throw new NotFound(['Parent post not found']);

    const comment = await prisma.comment.create({
        data: {
            content,
            author: { connect: { id: userId } },
            parentPost: { connect: { id: postId } },
        },
        include: { author: { select: { id: true, username: true } } },
    });

    if (!comment) throw new ServerError();
    return comment;
};
