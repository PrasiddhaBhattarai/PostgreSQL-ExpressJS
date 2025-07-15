import { Pool } from "pg";
import { config } from "dotenv";
config();

// create a new pool instance to manage database connections
// Instead of creating a new database connection for every query (which is inefficient), a connection pool maintains a set of open connections that can be reused.
const pool = new Pool({
    connectionString : process.env.DATABASE_URL
})

async function query(QueryText, parameters){
    const start = Date.now();

    try{
        // pool.query(queryText, valuesArray)
        const result = await pool.query(QueryText, parameters);
        
        //execute the time
        const duration = Date.now() - start;

        console.log(`Executed query : `, {QueryText, duration, rows: result.rowCount});
        return result;
    }
    catch(e){
        console.error(e);
        throw e;
    }
}

// you can export pool, and directly use pool.query(...)
export {query};

// my-app/
// ├── src/
// │   ├── config/             # DB config, environment settings
// │   │   └── db.js
// │   ├── controllers/        # Route handlers (business logic)
// │   │   └── user.controller.js
// │   ├── models/             # DB models or raw SQL queries
// │   │   └── user.model.js
// │   ├── routes/             # Route definitions
// │   │   └── user.routes.js
// │   ├── middlewares/        # Middleware (auth, error handling, logging)
// │   │   └── errorHandler.js
// │   ├── services/           # App logic (optional layer between controller and model)
// │   │   └── user.service.js
// │   ├── migrations/         # Migration scripts (e.g., with node-pg-migrate)
// │   ├── utils/              # Helpers, validators, formatters
// │   └── app.js              # Express app initialization
// ├── .env                    # Environment variables
// ├── index.js                # App entry point (loads app.js and starts server)
// ├── package.json
// └── README.md