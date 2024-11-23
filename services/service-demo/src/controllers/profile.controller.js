import {
  getProfilePicture,
  updateProfile,
  getProfile,
} from '../services/profile.service.js';

export const getProfilePic = async (req, res) => {
  const img = await getProfilePicture();
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
};

export const updateProfileData = async (req, res) => {
  const user = await updateProfile(req.body);
  res.send(user);
};

export const getProfileData = async (req, res) => {
  const profile = await getProfile();
  res.send(profile || {});
};
