const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./input.json', { encoding: 'utf-8' });
const rl = readline.createInterface({ input: readStream });
const id = +process.argv[2];

let name;
let currentObj = '';
rl.on('line', line => {
    const lineContent = line.trim();
    if (lineContent == '{') {
        currentObj = lineContent;
    } else if (lineContent == '}' || lineContent == '},') {
        currentObj += '}';
        const obj = JSON.parse(currentObj);
        if (obj.id === id) {
            name = obj.name;
            rl.close();
        }
    }
    else {
        currentObj += lineContent;
    }
});

rl.on('close', () => {
    console.log(name);
});
