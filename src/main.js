import { createUsersTable, insertUser, fetchAllUsers, updateUserEmail, deleteUser } from "./concepts/01_basic_queries.js";
import { getUsersWhere, getSortedUsers, getPaginatedUsers } from "./concepts/03_filtering_sorting.js";
import { createPostsTable, insertNewPost } from "./concepts/04_relationships.js";
import { getUsersWithPosts, getAllUsersAndTheirPosts } from "./concepts/05_joins.js";
import { countPostsByUser, averagePostsPerUser } from "./concepts/06_aggregation.js";

// test basic queries
// from file 01_basic_queries.js
async function testBasicQueries() {
    try {
        // (0) create users table
        // await createUsersTable();

        // (1) insert
        // await insertUser("Jose Mourinho","JoseMourinho@gmail.com");
        // await insertUser("Robin Van Persie","RobinVanPersie@gmail.com");
        // await insertUser("Paul Pogba","PaulPogba@gmail.com");
        // await insertUser("Wayne Rooney","WayneRooney@gmail.com");
        // await insertUser("Angel DiMaria","AngelDiMaria@gmail.com");

        // (2) fetch all users
        // const allUsers = await fetchAllUsers();
        // console.log(allUsers);

        // (3) update user email
        // const updatedUser = await updateUserEmail("Jose Mourinho", "SpecialOne@gmail.com");
        // console.log(updatedUser);

        // (4) delete user
        // const deletedUser = await deleteUser("Angel DiMaria");
        // console.log(deletedUser);

    } catch (error) {
        console.error("Error in testBasicQueries()",error);
    }
}

// from file 03_filtering_sorting.js
async function testFilterSortQueries() {
    try {
        // get users with username starting with "J"
        const zFilteredUsers = await getUsersWhere("username LIKE 'J%'");
        console.log(zFilteredUsers);

        // get users with username starting from letters between "P" to "Z"
        // const pTozFIlteredUsers = await getUsersWhere("username ~ '^[P-Z]'");
        // in postgre "~" => case-sensitive
        // in postgre "~*" => case-insensitive
        const pTozFIlteredUsers = await getUsersWhere("LEFT(username, 1) BETWEEN 'P' AND 'Z'");
        // LEFT(username, 1) extracts the first letter of the username.
        console.log(pTozFIlteredUsers);
        // can't use 'P%' AND 'Z%' with BETWEEN,
        // "%" Meaning in :
        //  LIKE : Wildcard (any characters)
        //  BETWEEN : Just a literal % character


        // get sorted users based on created_at
        const sortedUsers = await getSortedUsers('created_at', 'DESC');
        console.log(sortedUsers);

        // get paginated user
        const pagiantedUsers = await getPaginatedUsers(2,2);
        console.log(pagiantedUsers);
        
    } catch (error) {
        console.error("Error in testFilterSortQueries().");
    }
}

// from file 04_relationships.js
async function testRelationshipQueries(){
    try {
        // (0) create table
        // await createPostsTable();
        
        // (1) insert
        // const _1post = await insertNewPost("first post","this is first post of Jose Mourinho", 1);
        // console.log(_1post);

        // const _1post = await insertNewPost("second post","this is second post of Jose Mourinho", 1)

        const _1post = await insertNewPost("third post","this is first post of Paul Pogba", 3)

    } catch (error) {
        console.error("Error in testRelationshipQueries()",error);
    }
}

//from 05_joins.js
async function testJoinQueries() {
    try {
        //inner join
        // const usersWithPost = await getUsersWithPosts();
        // console.log(usersWithPost);

        //left join
        const allUsersWithTheirPost = await getAllUsersAndTheirPosts();
        console.log(allUsersWithTheirPost);
        
    } catch (error) {
        console.error("Error in testJoinQueries()",error);
    }
}

// from 06_aggregation.js
async function testAggregationQueries() {
    try {
        const postCount = await countPostsByUser();
        console.log(postCount);

        const averagePostsPerUserInfo = await averagePostsPerUser();
        console.log(averagePostsPerUserInfo);
        
    } catch (error) {
        console.error("Error in testAggregationQueries()",error);
    }
}

// function to run above functions
async function testAllQueries() {
    // await testBasicQueries();
    // await testFilterSortQueries();
    // await testRelationshipQueries();
    // await testJoinQueries();
    await testAggregationQueries();
}

testAllQueries();