import fs from 'fs';
import readline from 'readline';

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./server/controllers/sample.ts')
});

const methods = [{ name: "get", decorator: "@Get(" }, { name: "post", decorator: "@Post(" }, { name: "put", decorator: "@Put(" }, { name: "delete", decorator: "@Delete(" }, { name: "patch", decorator: "@Patch(" }]

let lineNumber = 0
lineReader.on('line', function (line: string) {
    lineNumber++
    const method = methods.find(({ decorator }) => line.includes(decorator))
    if (method != null) {
        console.log(lineNumber, method.decorator)
    }
});

export { }