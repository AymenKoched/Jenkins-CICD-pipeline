import fs from 'fs';
import path from 'path';
import {
  getProfilePicture,
  updateProfile,
  getProfile,
} from './profile.service.js';
import User from '../entities/user.js';

// Mocking fs.promises.readFile and User methods
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));
jest.mock('../entities/user.js', () => ({
  findOneAndUpdate: jest.fn(),
  findOne: jest.fn(),
}));

describe('Profile Service', () => {
  describe('getProfilePicture', () => {
    it('should return the profile picture data', async () => {
      // Setup mock return value for fs.readFile
      const mockImage = Buffer.from('mockImageData');
      fs.promises.readFile.mockResolvedValue(mockImage);

      const result = await getProfilePicture();

      expect(result).toEqual(mockImage);
      expect(fs.promises.readFile).toHaveBeenCalledWith(
        path.resolve('./assets/images/profile-2.jpg'),
      );
    });

    it('should throw an error if there is an issue reading the file', async () => {
      fs.promises.readFile.mockRejectedValue(new Error('File not found'));

      await expect(getProfilePicture()).rejects.toThrow('File not found');
    });
  });

  describe('updateProfile', () => {
    it('should update the profile and return the updated user', async () => {
      const mockUserObj = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        interests: 'football only',
      };
      const mockUpdatedUser = { ...mockUserObj, userid: 1 };

      // Mock the behavior of User.findOneAndUpdate
      User.findOneAndUpdate.mockResolvedValue(mockUpdatedUser);

      const result = await updateProfile(mockUserObj);

      expect(result).toEqual(mockUpdatedUser);
      expect(User.findOneAndUpdate).toHaveBeenCalledWith(
        { userid: 1 },
        { $set: mockUserObj },
        { upsert: true, new: true },
      );
    });

    it('should throw an error if update fails', async () => {
      const mockUserObj = { name: 'John Doe', email: 'john.doe@example.com' };

      User.findOneAndUpdate.mockRejectedValue(new Error('Update failed'));

      await expect(updateProfile(mockUserObj)).rejects.toThrow('Update failed');
    });
  });

  describe('getProfile', () => {
    it('should return the user profile', async () => {
      const mockUser = {
        userid: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        interests: 'football only',
      };

      // Mock the behavior of User.findOne
      User.findOne.mockResolvedValue(mockUser);

      const result = await getProfile();

      expect(result).toEqual(mockUser);
      expect(User.findOne).toHaveBeenCalledWith({ userid: 1 });
    });

    it('should return null if no user found', async () => {
      User.findOne.mockResolvedValue(null);

      const result = await getProfile();

      expect(result).toBeNull();
    });
  });
});
