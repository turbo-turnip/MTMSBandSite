const Pool = require("pg").Pool;

const pool = new Pool({
	user: process.env.PSQL_USER,
	password: process.env.PSQL_PASS,
	host: "localhost",
	port: 5432,
	database: "mtmsbandsite"
});

module.exports = pool;
