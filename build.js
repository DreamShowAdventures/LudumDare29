var fs = require('fs');

fs.createReadStream('test.log').pipe(fs.createWriteStream('out/newLog.log'));