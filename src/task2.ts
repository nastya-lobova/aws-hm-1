import csv from 'csvtojson/v2';
import CSVError from "csvtojson/v2/CSVError";
import { WriteStream, createWriteStream } from 'fs';
import path from 'path';

const csvFilePath: string = path.join(__dirname, './csv/nodejs-hw1-ex1.csv');
const outputFilePath: string =  path.join(__dirname, './csv/nodejs-hw1-ex1.txt');

const writeStream: WriteStream = createWriteStream(outputFilePath);

csv()
    .fromFile(csvFilePath)
    .subscribe((json) => new Promise((resolve) => {
        const TRANSFER_SIGN = '\n';
        writeStream.write(JSON.stringify(json) + TRANSFER_SIGN);

        resolve();
    }), (err: CSVError) => {
        console.error(err);
    }, () => {
        console.log('The file was created successfully');
    });