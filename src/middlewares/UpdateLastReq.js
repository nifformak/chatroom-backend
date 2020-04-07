import express from 'express';
import UserModel from '../models/User';

export default (
    req, res, next
) => {
    if (req.user) {
        UserModel.findOneAndUpdate(
            {_id: req.user._id},
            {
                last_seen: new Date()
            },
            {new: true},
            () => {
            }
        );
    }
    next();
};