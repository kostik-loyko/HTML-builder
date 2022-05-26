const fs = require('fs');
const path = require('path');

let way = path.join(__dirname, "secret-folder");

const reader = (way) => {
   fs.readdir(way, { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      files.forEach(file => {

         let newWay = path.join(way, file.name);

         if (file.isFile()) {
            
            fs.stat(newWay, (err, stats) => {
               if (err) throw err;
               console.log(path.basename(newWay, path.extname(newWay)) + ' - ' + path.extname(file.name).slice(1) + ' - ' + ((stats.size) / 1000) + 'kb');
            });
         }
      })
   });
}

reader(way);


// ДЛЯ ПРОХОЖДЕНИЯ ПО ВСЕМ ВЛОЖЕННЫМ ПАПКАМ

// let way = path.join(__dirname, "secret-folder");

// const reader = (way) => {
//    fs.readdir(way, { withFileTypes: true }, (err, files) => {
//       if (err) throw err;

//       files.forEach(file => {

//          let newWay = path.join(way, file.name);

//          if (file.isDirectory()) {
//             reader(newWay);
//          } else {
//             fs.stat(newWay, (err, stats) => {
//                if (err) throw err;
//                console.log(path.basename(newWay, path.extname(newWay)) + ' - ' + path.extname(file.name).slice(1) + ' - ' + ((stats.size) / 1000) + 'kb');
//             });
//          }
//       })
//    });
// }

// reader(way);