import joi from 'joi';
import { validateInput } from '../../middleware/inputValidator';

const createPostSchema = joi
    .object({
        title: joi.string().min(3).max(50).required(),
        content: joi.string().min(3).required(),
    })
    .options({
        abortEarly: false,
    });

const updatePostSchema = joi.object({
    content: joi.string().min(3).required(),
});

export const validateCreatePostInput = validateInput(createPostSchema);
export const validateUpdatePostInput = validateInput(updatePostSchema);
