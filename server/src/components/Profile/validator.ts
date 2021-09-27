import joi from 'joi';
import { validateInput } from '../../middleware/inputValidator';

const userProfileSchema = joi
    .object({
        firstName: joi.string().alphanum().allow('').optional(),
        lastName: joi.string().alphanum().allow('').optional(),
        bio: joi.string().allow('').optional(),
        twitterUrl: joi.string().allow('').optional(),
        githubUrl: joi.string().allow('').optional(),
        websiteUrl: joi.string().allow('').optional(),
    })
    .options({ abortEarly: false });

export const validateProfileInput = validateInput(userProfileSchema);
