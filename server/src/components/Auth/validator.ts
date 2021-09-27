import joi from 'joi';
import { validateInput } from '../../middleware/inputValidator';

const registerUserSchema = joi
    .object({
        username: joi.string().alphanum().min(3).max(25).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(255).required(),
        verifyPassword: joi
            .any()
            .valid(joi.ref('password'))
            .required()
            .options({ messages: { 'any.only': 'Passwords must match' } }),
    })
    .options({
        abortEarly: false,
    });

const loginUserSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
});

export const validateRegisterInput = validateInput(registerUserSchema);
export const validateLoginInput = validateInput(loginUserSchema);
