import fs from 'fs';
import path from 'path';
import User from '../entities/user.js';

export const getProfilePicture = async () => {
  return fs.promises.readFile(path.resolve('./assets/images/profile-1.jpg'));
};

export const updateProfile = async (userObj) => {
  userObj['userid'] = 1;
  const myQuery = { userid: 1 };
  const newValues = { $set: userObj };
  return User.findOneAndUpdate(myQuery, newValues, { upsert: true, new: true });
};

export const getProfile = async () => {
  const myQuery = { userid: 1 };
  return User.findOne(myQuery);
};
