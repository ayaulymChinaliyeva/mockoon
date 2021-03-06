const replace = require('replace-in-file');

const currentVersion = require('./package.json').version;

const newVersion = process.argv[2];

if (newVersion) {
  const options = {
    files: [
       './src/index.html',
      './src/app/config.ts',
      './src/electron-main.js'
    ],
    from: new RegExp(currentVersion, 'g'),
    to: newVersion
  };

  // TODO update to handle multiple replace in same file (updates.json)
  const jsonOptions = {
    files: [
      './src/package.json',
      './package.json',
      './updates.json'
    ],
    from: `"version": "${currentVersion}"`,
    to: `"version": "${newVersion}"`
  };

   replace(options)
    .then(changedFiles => {
      console.log('Modified files:', changedFiles.join(', '));
    })
    .catch(error => {
      console.error('Error occurred:', error);
    });
  replace(jsonOptions)
    .then(changedFiles => {
      console.log('Modified files:', changedFiles.join(', '));
    })
    .catch(error => {
      console.error('Error occurred:', error);
    });
} else {
  console.error('Error: You need to provide a version number');
}

