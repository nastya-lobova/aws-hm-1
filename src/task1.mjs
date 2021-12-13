import { Transform } from "stream";

class ReverseTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    const TRANSFER_SIGN = '\n';
    const arrayFromString = chunk.toString().split('').reverse();
    const indexOfTransferSign = arrayFromString.indexOf(TRANSFER_SIGN);

    if (indexOfTransferSign !== -1) {
      arrayFromString.splice(indexOfTransferSign, 1);
      arrayFromString.push(TRANSFER_SIGN, TRANSFER_SIGN);
    }

    this.push(arrayFromString.join(''));

    callback();
  }
}

const reverseTransformStream = new ReverseTransformStream();

process.stdin.pipe(reverseTransformStream).pipe(process.stdout);