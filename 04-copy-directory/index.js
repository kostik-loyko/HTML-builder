const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
   await fs.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true });
   await fs.mkdir(path.join(__dirname, 'files-copy'));

   const files = await fs.readdir(path.join(__dirname, 'files'));

   for (const file of files) {
      await fs.copyFile(path.join(__dirname, `files/${file}`), path.join(__dirname, `files-copy/${file}`));
   }
}

copyDir();



// БОНУСНОЕ РЕШЕНИЕ БЕЗ ПРОМИСОВ

// const fs = require('fs');
// const path = require('path');

// fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
//    if (err) throw err;
// });

// fs.readdir(path.join(__dirname, 'files'), (err, files) => {
//    if (err) throw err;

//    files.forEach(file => {
//       fs.copyFile(path.join(__dirname, `files/${file}`), path.join(__dirname, `files-copy/${file}`), (err) => { });
//    });
// });

