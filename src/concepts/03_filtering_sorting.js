import { query } from "../config/db.js";

// filter rows as per condition
// WHERE clause
async function getUsersWhere(condition) {
    const WHEREquery = `
    SELECT * FROM users
    WHERE ${condition}
    `;

    try {
        const res = await query(WHEREquery);
        if (res.rows.length > 0) {
            console.log("Users filtered successfully.");
            return res.rows;
        }else{
            console.log("No Users found.");
            return null;
        }
        
    } catch (error) {
        console.error("Error in WHERE clause", error);
    }
}

// get sorted users
// ORDER BY clause
async function getSortedUsers(column, order='ASC'){
    const sortedQuery = `
    SELECT * FROM users
    ORDER BY ${column} ${order}
    `;

    try {
        const res = await query(sortedQuery);
        if (res.rows.length > 0) {
            console.log("Users sorted successfully.");
            return res.rows;
        }else{
            console.log("No Users found.");
            return null;
        }
        
    } catch (error) {
        console.error("Error in ORDER BY clause", error);
    }
}

// pagination
// LIMIT OFFSET clause
async function getPaginatedUsers(limit, offset) {
    // LIMIT 10 OFFSET 20;
    //  Returns 10 rows, starting from the 21st row (i.e., skips 20),

    const paginatedQuery = `
    SELECT * FROM users
    ORDER BY created_at ASC
    LIMIT $1 OFFSET $2
    `;

    try {
        const res = await query(paginatedQuery, [limit, offset]);
        if (res.rows.length > 0) {
            console.log("Users paginated successfully.");
            return res.rows;
        }else{
            console.log("No Users found.");
            return null;
        }
        
    } catch (error) {
        console.error("Error in Pagination", error);
    }
}

export {
    getUsersWhere,
    getSortedUsers,
    getPaginatedUsers
};