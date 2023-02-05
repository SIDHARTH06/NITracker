const parse = require('pg-connection-string').parse;
const config = parse('postgres://codeinit_user:1ogBooDbuM77CwwDQlKoTwsdnQDVEuB8@dpg-cfbmm64gqg4aqeujmrcg-a.oregon-postgres.render.com/codeinit');
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
  },
});
// const path = require('path');

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'sqlite',
//     connection: {
//       filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//     },
//     useNullAsDefault: true,
//   },
// });