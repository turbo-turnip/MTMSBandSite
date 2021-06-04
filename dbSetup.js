const Pool = require("pg").Pool;

const devConfig = {
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASS,
    host: "localhost",
    port: 5432,
    database: "mtmsbandsite"
};

const proConfig = {
	connectionString: process.env.DATABASE_URL
};

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;
