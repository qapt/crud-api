import { Request, Response, NextFunction } from 'express';
import { AUTH_TOKEN } from './../../utils/constants';
import * as ProfileService from './service';

export const getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    try {
        const userProfile = await ProfileService.findUserProfileById(userId);
        res.json({ message: 'User profile', userProfile });
    } catch (error) {
        next(error);
    }
};

export const getUserLikedPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    try {
        const userLikedPosts = await ProfileService.findUserLikedPosts(userId);
        res.json({ message: 'User liked posts', userLikedPosts });
    } catch (error) {
        next(error);
    }
};

export const createOrUpdateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    const profileInput = req.body;

    // Not needed to check if fields exist, all are optional
    const profileToBeCreatedOrUpdated: CreateProfileInput = {
        userId,
        firstName: profileInput.firstName,
        lastName: profileInput.lastName,
        bio: profileInput.bio,
        twitterUrl: profileInput.twitterUrl,
        githubUrl: profileInput.githubUrl,
        websiteUrl: profileInput.websiteUrl,
    };

    try {
        const newProfile = await ProfileService.createOrUpdateProfile(
            profileToBeCreatedOrUpdated
        );

        res.status(201).json({
            message: 'User profile updated successfully',
            profile: newProfile,
        });
    } catch (error) {
        next(error);
    }
};
