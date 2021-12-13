import csvtojson from 'csvtojson';
import fs from 'fs';
import path from 'path';
import { pipeline, Transform } from 'stream';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

class ControlLineStream extends Transform {
  constructor() {
    super();

    this.data = '';
  }

  _transform(chunk, encoding, callback) {
    const TRANSFER_SIGN = '\n';
    const index = chunk.toString().indexOf(TRANSFER_SIGN);

    if (index !== -1) {
      this.data+= chunk.toString().slice(0, index);

      this.push(this.data);

      this.data = chunk.toString().slice(index, chunk.toString().length);
    } else {
      this.data+=chunk;
    }

    callback();
  }
}

const readStream = fs.createReadStream(path.join(__dirname, './csv/nodejs-hw1-ex1.csv'), {
  highWaterMark: 10
});
const writeStream = fs.createWriteStream(path.join(__dirname, './csv/nodejs-hw1-ex1.txt'));
const controlLineStream = new ControlLineStream();

pipeline(
  readStream,
  controlLineStream,
  csvtojson(),
  writeStream,
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('The file was created successfully');
    }
  }
);