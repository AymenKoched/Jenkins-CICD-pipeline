import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDb from './db/database.js';
import { getHome } from './controllers/home.controller.js';
import {
  getProfileData,
  getProfilePic,
  updateProfileData,
} from './controllers/profile.controller.js';

export function createApp() {
  const app = express();

  connectDb();

  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());

  app.use(morgan('dev'));

  app.get('/', getHome);

  app.get('/profile-picture', getProfilePic);
  app.post('/update-profile', updateProfileData);
  app.get('/get-profile', getProfileData);

  return app;
}
