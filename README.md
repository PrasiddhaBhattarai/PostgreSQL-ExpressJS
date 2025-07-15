# Postgres Concepts with Node.js

This project demonstrates core PostgreSQL concepts using Node.js, including basic queries, connection pooling, filtering, sorting, relationships, joins, and aggregation. It uses the pg library for PostgreSQL integration and organizes code by concept for easy learning and experimentation.

---

## 🚀 Features

- **Basic Queries**: Create, read, update, and delete users.
- **Connection Pooling**: Efficient database connections using a pool.
- **Filtering & Sorting**: Query users with flexible conditions, sorting, and pagination.
- **Relationships**: Posts table with foreign key to users.
- **Joins**: Inner and left joins to fetch related data.
- **Aggregation**: Count and average posts per user.

---

## 📁 Project Structure

```
.
├── 01_basic_queries.js         # CRUD operations on users
├── 02_pool_connect.js          # Manual connection handling & transactions
├── 03_filtering_sorting.js     # Filtering, sorting, and pagination
├── 04_relationships.js         # Post-user relationships
├── 05_joins.js                 # Fetching users with their posts
├── 06_aggregation.js           # Aggregated user-post data
├── db.js                       # Database connection pool setup
├── main.js                     # Entry point to run test queries
└── .env                        # Environment variables (PostgreSQL connection string)
```

---

## 🛠 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- PostgreSQL running locally or remotely

### 📦 Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PrasiddhaBhattarai/PostgreSQL-ExpressJS.git
   cd postgres-node-concepts
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
   ```

4. **Run the project:**

   The main entry point is `main.js`. Uncomment the relevant function calls in `testAllQueries()` to try different features.

   ```bash
   node main.js
   ```

---

## 🧠 Code Overview

- **Database Connection**:  
  `db.js` exports a `query` function using a connection pool.

- **Basic Queries** (`01_basic_queries.js`):  
  CRUD operations on users.

- **Connection Pool Example** (`02_pool_connect.js`):  
  Manual connection management and transactions.

- **Filtering & Sorting** (`03_filtering_sorting.js`):  
  Flexible user queries.

- **Relationships** (`04_relationships.js`):  
  Posts linked to users.

- **Joins** (`05_joins.js`):  
  Fetching users with their posts.

- **Aggregation** (`06_aggregation.js`):  
  Count and average posts per user.

---

## ⚠️ Notes

- Tables are created programmatically; see the relevant functions in each concept file.
- For production, use migrations for schema management.
- This project is for educational purposes and not intended for production use.

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
