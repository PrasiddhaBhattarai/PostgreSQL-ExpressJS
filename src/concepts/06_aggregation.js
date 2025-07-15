import { query } from "../config/db.js";

async function countPostsByUser() {
    const currQuery = `
    SELECT users.username, COUNT(posts.id) as post_count
    FROM users
    LEFT JOIN posts 
    ON users.id = posts.user_id
    GROUP BY users.id, users.username
    `;

    try {
        const res = await query(currQuery);
        return res.rows;

    } catch (error) {
        console.error(error);
    }
}

async function averagePostsPerUser() {
    const currQuery = `
    SELECT AVG(post_count) as average_posts
    FROM(
        SELECT COUNT(posts.id) as post_count
        FROM users
        LEFT JOIN posts 
        ON users.id = posts.user_id
        GROUP BY users.id
    ) as user_per_counts
    `;
    // initially inner query is executed
    // then outer query is generated

    // (Q) What does "as user_per_counts" do?
    //  -> This is giving a name (alias) to the subquery — just like you'd give a nickname to a table.

    // (Q) Why it’s required:
    //  -> SQL requires that all subqueries in the FROM clause have an alias.
    //  -> This allows you to reference it later if needed (e.g., user_per_counts.post_count). But this is destroyed immediately after the query finishes.9 ppppp               

    try {
        const res = await query(currQuery);
        return res.rows;

    } catch (error) {
        console.error(error);
    }
}

export { 
    countPostsByUser,
    averagePostsPerUser
};