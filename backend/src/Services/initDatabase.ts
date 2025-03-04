import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development.local' });

async function initDatabase() {

    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS accounts (
                id INT AUTO_INCREMENT PRIMARY KEY,  
                userName varchar(255) NOT NULL,
                password VARCHAR(100) NOT NULL,  
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
            );  
        `;

        await conn.query(createTableQuery);  // 使用占位符避免SQL注入
    }catch (error){
        console.error("Create table accounts error:", error);
    }finally{
        try {
            await conn.end();  // 确保数据库连接正常关闭
        } catch (closeError) {
            console.error("Error closing connection:", closeError);
        }
    }
}

export default initDatabase;