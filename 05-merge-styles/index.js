const fs = require('fs/promises');
const path = require('path');

async function bundleCss() {

   const files = await fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
   let bundleData = '';

   for (let file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {

         const fileData = await fs.readFile(path.join(__dirname, `styles/${file.name}`), 'utf-8');
         bundleData += fileData;

         await fs.writeFile(path.join(__dirname, 'project-dist/bundle.css'), bundleData);
      }
   };
}

bundleCss();


// БОНУСНОЕ РЕШЕНИЕ БЕЗ ПРОМИСОВ

// fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
//    if (err) throw err;

//    let writeableStream = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));

//    files.forEach(file => {
//       if (file.isFile() && path.extname(file.name) === '.css') {
//          let readableStream = fs.createReadStream(path.join(__dirname, `styles/${file.name}`), 'utf-8');

//          readableStream.pipe(writeableStream);
//       }
//    });
// });


