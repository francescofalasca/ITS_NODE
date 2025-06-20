import MsSql from 'mssql';
import ErrorWithStatus from '../../ErrorWithStatus';

const sqlConfig = {
    server: process.env.MSSQL_HOST!,
    database: process.env.MSSQL_NAME!,
    port: 1433,
    user: process.env.MSSQL_USERNAME!,
    password: process.env.MSSQL_PASSWORD!,
    connectionTimeout: 20000,
    requestTimeout: 20000,
    options: {
      appName: "corso-its",
      encrypt: false,
    },
};

const poolPromise = new MsSql.ConnectionPool(sqlConfig)
  .connect()
  .then((pool) => {
    console.log(
      `Connected to MSSQL (${sqlConfig.server}) database name: ${sqlConfig.database}!`
    );

    return pool;
  })
  .catch((err) => {
    throw new ErrorWithStatus(500, `Database connection failed! Bad config: ${err}`);
});

export default poolPromise;