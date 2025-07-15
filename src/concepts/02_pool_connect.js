// just for understanding
// don't run

// Use pool.connect() When:
//  1)You need to run multiple queries that must share the same connection (e.g. inside a transaction).
//  2)You're using BEGIN / COMMIT / ROLLBACK.
//But this does consume little more time and server resources than pool.query


// you don't need to use BEGIN/ ROLLBACK in every insert:
// ->PostgreSQL will automatically roll back a failed single-statement query.
//   eg:await pool.query('INSERT INTO users(name) VALUES($1)', ['Alice']);
// If that insert fails (e.g., due to a duplicate key), it just throws an error — no manual ROLLBACK needed.


//example 1
const client = await pool.connect();

try {

    await client.query('BEGIN');

    await client.query('UPDATE accounts SET balance = balance - 100 WHERE name = $1', ['Alice']);
    await client.query('UPDATE accounts SET balance = balance + 100 WHERE name = $1', ['Bob']);

    //reaching here means both of the above query ran without error, so we can commit them
    //No, the changes made between client.query('insert/update') and client.query('COMMIT') are not visible to other database users or sessions.
    await client.query('COMMIT'); // Save both changes

} catch (err) {
    await client.query('ROLLBACK'); // Undo both changes if any fails

} finally {
    client.release(); // Always release the client
}


// example 2
async function runTransaction() {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query('INSERT INTO users(name) VALUES($1)', ['Alice']);
        await client.query('INSERT INTO logs(message) VALUES($1)', ['User added']);

        await client.query('COMMIT');

    } catch (e) {
        await client.query('ROLLBACK');
        console.error('Transaction error:', e);

    } finally {
        client.release();
    }
}