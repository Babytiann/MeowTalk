import mysql from "mysql2/promise";

async function getCardHistory(userName: string) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try{
        const query = `select * from history where userName = ? ORDER BY timestamp ASC`;
        const [rows] = await conn.execute(query, [userName]);

        return rows;
    }catch(err){
        console.error("fetch CardHistory error", err);
    }finally {
        conn.end();
    }
}

export default getCardHistory;