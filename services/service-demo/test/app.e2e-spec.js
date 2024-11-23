const request = require('supertest');
const createApp = require('../src/createApp.js');
const connectDb = require('../src/db/database.js');
const mongoose = require('mongoose');

let app;
let server;

beforeAll(async () => {
  await connectDb();
  app = createApp();
  server = app.listen(4000);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('E2E Tests for Profile API', () => {
  it('should fetch the profile picture', async () => {
    const response = await request(app).get('/profile-picture');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toBe('image/jpg');
  });

  it('should update the profile', async () => {
    const updateData = { name: 'John Doe', interests: 'coding, reading' };
    const response = await request(app)
      .post('/update-profile')
      .send(updateData)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'John Doe');
    expect(response.body).toHaveProperty('interests', 'coding, reading');
  });

  it('should fetch the profile data', async () => {
    const response = await request(app).get('/get-profile');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userid', 1);
  });
});
