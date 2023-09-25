import * as process from 'process';
import * as fs from 'fs';

export default () => ({
  key: fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8'),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8'),
});
