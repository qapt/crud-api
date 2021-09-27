import { validateInput } from '../../middleware/inputValidator';
import joi from 'joi';

const commentSchema = joi.object({
    content: joi.string().min(3).max(200).required(),
});

export const validateCommentInput = validateInput(commentSchema);
