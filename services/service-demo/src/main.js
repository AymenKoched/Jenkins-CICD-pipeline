import createApp from './createApp.js';

const app = createApp();

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
