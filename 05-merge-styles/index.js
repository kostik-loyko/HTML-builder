const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
   if (err) throw err;

   let writeableStream = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));

   files.forEach(file => {
      if (file.isFile() && path.extname(file.name) === '.css') {
         let readableStream = fs.createReadStream(path.join(__dirname, `styles/${file.name}`), 'utf-8');

         readableStream.pipe(writeableStream);
      }
   });
});