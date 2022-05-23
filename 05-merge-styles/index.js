const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
   if (err) throw err;

   files.forEach(file => {
      if (file.isFile() && path.extname(file.name) === '.css') {
         let readableStream = fs.createReadStream(path.join(__dirname, `styles/${file.name}`), 'utf-8');
         let writeableStream = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));
         readableStream.on('data', data => writeableStream.write(data));
         // readableStream.pipe(writeableStream);
      }
   });
});