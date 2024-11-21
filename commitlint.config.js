const fs = require('fs').promises;
const path = require('path');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [0, 'never'],
    'scope-enum': async () => {
      const scopes = ['cross-package', 'release'];

      const [services] = await Promise.all([
        fs.readdir(path.join(__dirname, 'services')),
      ]);
      scopes.push(...services);

      return [2, 'always', scopes];
    },
    'subject-case': [0, 'never'],
  },
};
