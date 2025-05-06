import mysql from "mysql2/promise";

async function deleteHistory(sessionId: string){
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try{
        await conn.execute('DELETE FROM history WHERE sessionId = ?', [sessionId]);
        await conn.execute('DELETE FROM dialoginfo WHERE sessionId = ?', [sessionId]);

        console.log(`Delete history with sessionId: ${sessionId} successfully`);
    }catch (err){
        console.error("Delete history dialog error: ", err);
    }
}

export default deleteHistory;