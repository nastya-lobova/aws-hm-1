import { Transform, TransformCallback } from "stream";

class ReverseTransformStream extends Transform {
  _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
    const TRANSFER_SIGN: string = '\n';
    const arrayFromString: Array<string> = chunk.toString().split('').reverse();
    const indexOfTransferSign: number = arrayFromString.indexOf(TRANSFER_SIGN);

    if (indexOfTransferSign !== -1) {
      arrayFromString.splice(indexOfTransferSign, 1);
      arrayFromString.push(TRANSFER_SIGN, TRANSFER_SIGN);
    }

    this.push(arrayFromString.join(''));

    callback();
  }
}

const stdin: NodeJS.ReadStream = process.stdin;
const stdout: NodeJS.WriteStream = process.stdout;
const reverseTransformStream = new ReverseTransformStream();

stdin.pipe(reverseTransformStream).pipe(stdout);