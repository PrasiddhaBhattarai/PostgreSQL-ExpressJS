import { query } from "../config/db.js";

//inner join
async function getUsersWithPosts() {
    const currQuery = `
    SELECT users.username, users.email , posts.title
    FROM users
    INNER JOIN posts
    ON users.id = posts.user_id
    `;

    try {
        const res = await query(currQuery);
        console.log("Users with Posts");
        return res.rows;
        
    } catch (error) {
        console.error("error in inner join", error);
    }
}

//left join
async function getAllUsersAndTheirPosts() {
    const currQuery = `
    SELECT users.username, users.email , posts.title
    FROM users
    LEFT JOIN posts
    ON users.id = posts.user_id
    `;

    try {
        const res = await query(currQuery);
        console.log("All Users and their Posts");
        return res.rows;
        
    } catch (error) {
        console.error("error in left join", error);
    }
}

export {
    getUsersWithPosts,
    getAllUsersAndTheirPosts
};