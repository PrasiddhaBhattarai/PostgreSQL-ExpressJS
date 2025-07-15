import { query } from "../config/db.js";

// create new table
async function createPostsTable(){
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`;
    // ON DELETE CASCADE,
    // -> the rows on posts table will be deleted if user is deleted from users table

    try {
        await query(createTableQuery);
        console.log("posts table created successfully.");
    } catch (error) {
        console.error("error when creating posts table.", error);
    }
}

//insert function
async function insertNewPost(title, content, userId) {
    const insertPostQuery = `
    INSERT INTO posts (title, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;

    try {
        const res = await query(insertPostQuery, [title, content, userId]);
        console.log("post inserted successfully.");
        return res.rows[0];

    } catch (error) {
        console.error("error inserting to posts.", error);
    }
}

export{
    createPostsTable,
    insertNewPost
};