import { config } from 'dotenv';
import { query } from '../config/db.js';

// we don't create table by ourself in larger projects.
async function createUsersTable() {
    // we use migration tool to create, modify table.
    // -> migration tools help you manage and version your database schema (like tables, columns, constraints) over time — just like version control (e.g., Git) does for code.

    // A migration is a script that makes a specific change to your database, such as:
    //   1) Creating a table
    //   2) Adding a column
    //   3) Modifying a data type
    //   4) Renaming or dropping a table
    // Each migration is usually saved as a separate file, and tools track which migrations have been run.

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `;

    try {
        await query(createTableQuery);
        console.log('Users table created successfully');
    } catch (e) {
        console.error("Error while creating users table", error);
    }
}

//inset user info
async function insertUser(username, email) {

    // parameterized queries
    const insertUserQuery = `
    INSERT INTO users (username, email)
    VALUES($1, $2)
    RETURNING *
    `
    //above query prevents sql injection
    //The use of $1 and $2 placeholders (called bind parameters) ensures that:
    //  1)User input is treated as data, not as part of the SQL command.
    //  2)The database driver (pg in your case) automatically escapes any special characters or malicious input.

    // RETURNING *
    //  1)RETURNING: This clause is used in PostgreSQL (and some other databases) to specify that you want to return data after the INSERT operation is completed.
    //  2)*: The asterisk * means "return all columns" from the newly inserted row. So, after inserting the username and email, the query will return all the columns of the newly inserted record.
    // This allows you to see the entire row that was inserted, including any auto-generated values, such as an id column if it's set to auto-increment.


    try {
        const res = await query(insertUserQuery, [username, email]);
        console.log("user inserted successfuly", res.rows[0]);
        return res.rows[0];
    } catch (error) {
        console.error("Error while inserting user", error);
    }
}

// fetch all users
async function fetchAllUsers() {
    const getAllUsersFromTable = `SELECT * FROM users`;
    try {
        const res = await query(getAllUsersFromTable);
        console.log("Fetched all users from users.");
        return res.rows;

    } catch (error) {
        console.error("error", error);
    }
}

// update user
async function updateUserEmail(username, newEmail) {
    const updateUserQuery = `
    UPDATE users
    SET email = $2
    WHERE username = $1
    RETURNING *
    `

    try {
        const res = await query(updateUserQuery, [username, newEmail]);

        if (res.rows.length > 0) {
            console.log("user email updated successfully");
            return res.rows[0];
        } else {
            console.log("No user found with given username.");
            return null;
        }

    } catch (error) {
        console.error("Error in updating email", error);
    }
}

// delete user
async function deleteUser(username) {
    const deleteUserQuery = `
    DELETE FROM users
    WHERE username = $1
    RETURNING *
    `

    try {
        const res = await query(deleteUserQuery, [username]);

        if (res.rows.length > 0) {
            console.log("user deleted successfully");
            return res.rows[0];
        } else {
            console.log("No user found with given username.");
            return null;
        }

    } catch (error) {
        console.error("Error in deleting User", error);
    }
}

export {
    createUsersTable,
    insertUser,
    fetchAllUsers,
    updateUserEmail,
    deleteUser
};