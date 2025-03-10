import mysql from "mysql2/promise";

async function getHistory(sessionId: string, userName: string) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try{
        const query = `select * from dialoginfo where sessionId = ? and userName = ? ORDER BY timestamp ASC`;
        const [rows] = await conn.execute(query, [sessionId, userName]);
        console.log(rows);
        return rows;
    }catch(err){
        console.error("fetch histryDialog error", err);
    }finally {
        conn.end();
    }
}

export default getHistory;