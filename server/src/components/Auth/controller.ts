import { AUTH_TOKEN } from './../../utils/constants';
import { Request, Response, NextFunction } from 'express';
import * as UserService from './service';
import { clearAuthCookie, createAuthCookie } from './utils/authCookie';

// TODO: not return password with user data
// TODO: forgot password / change password

export const user = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.signedCookies[AUTH_TOKEN]) {
        return res.json({ loggedIn: false });
    } else {
        const user = await UserService.findUserById(
            req.signedCookies[AUTH_TOKEN]
        );
        return res.json({ user, loggedIn: true });
    }
};

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, email, password } = req.body;

    const newUser: UserRegisterInput = {
        username,
        email,
        password,
    };
    try {
        const createdUser = await UserService.createUser(newUser);
        createAuthCookie(res, createdUser.id);

        res.status(201).json({
            message: 'User registered successfully',
            user: createdUser,
        });
    } catch (error) {
        next(error);
    }
};

// TODO: allow login with email
export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body;

    try {
        const user = await UserService.loginUser(username, password);

        createAuthCookie(res, user.id);
        res.json({
            message: 'Logged in successfully',
            user: {
                username: user.username,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    clearAuthCookie(res);
    res.json({ message: 'Logged out successfully' });
};
