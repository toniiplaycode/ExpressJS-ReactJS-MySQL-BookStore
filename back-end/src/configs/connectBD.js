import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'expressreact-bookstore',
    password: '30012003'
})

export default pool;