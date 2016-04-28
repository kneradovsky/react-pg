import config from '../webpack.config.prod';
import cardServicesServer from '../cardservicesServer';
import colors from 'colors';
import fs from 'fs';

fs.createReadStream(`${config.output.path}/${config.output.filename}`).pipe(fs.createWriteStream(`${cardServicesServer.jsPath}/${config.output.filename}`));
fs.createReadStream(`${config.output.path}/${config.output.filename}.map`).pipe(fs.createWriteStream(`${cardServicesServer.jsPath}/${config.output.filename}.map`));
  
 console.log(`Bundle copied to ${cardServicesServer.jsPath}/${config.output.filename}`.green);