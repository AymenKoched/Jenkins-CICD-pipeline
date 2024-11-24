import createApp from './createApp.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const env = require('../conf/env.json');

const app = createApp();

const port = env.server.port;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
