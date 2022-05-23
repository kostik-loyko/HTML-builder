const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');


const output = fs.createWriteStream(path.join(__dirname, 'test.txt'));

stdout.write('Ввведите текст:\n');

process.stdin.on('data', function (chunck) {

   if (chunck.toString().trim() === 'exit') {
      process.exit(stdout.write('Вы вышли из программы ввода в консоль!'));
   } else {
      output.write(chunck.toString());
   }

   process.on('SIGINT', () => {
      process.exit(stdout.write('Вы вышли из программы ввода в консоль!'));
   });
})

