const fs = require('fs/promises');
const path = require('path');

const copiedFolder = path.join(__dirname, 'project-dist');

async function buildPage() {
   await fs.rm(copiedFolder, { recursive: true, force: true });
   await fs.mkdir(copiedFolder);

   const template = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
   let newTemplate = template;
   const tags = template.match(/{{\s*([\w-]+)\s*}}/g);

   await fs.copyFile(path.join(__dirname, 'template.html'), path.join(copiedFolder, 'index.html'));

   for (const tag of tags) {

      let fileName = tag.replace(/[{}]/g, '') + '.html';
      let fileContent = await fs.readFile(path.join(__dirname, 'components', fileName), 'utf-8');

      newTemplate = newTemplate.replace(tag, fileContent);
      await fs.writeFile(path.join(copiedFolder, 'index.html'), newTemplate);
   }
}

buildPage();

async function bundleCss() {

   const files = await fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
   let bundleData = '';

   for (let file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {

         const fileData = await fs.readFile(path.join(__dirname, `styles/${file.name}`), 'utf-8');
         bundleData += fileData;

         await fs.writeFile(path.join(__dirname, 'project-dist/style.css'), bundleData);
      }
   };
}

bundleCss();


async function copyDir() {
   await fs.rm(path.join(__dirname, 'project-dist/assets'), { recursive: true, force: true });
   await fs.mkdir(path.join(__dirname, 'project-dist/assets'));

   const dirs = await fs.readdir(path.join(__dirname, 'assets'));

   for (const dir of dirs) {
      console.log(dir);
   }
}

copyDir();


// НЕ РЕШИЛ