const db = require('./ai-node-backend/db');

async function checkTable() {
    try {
        const [rows] = await db.execute('DESCRIBE personal_notes');
        console.log('Table structure:');
        console.table(rows);
    } catch (error) {
        console.error('Error describing table:', error.message);
        if (error.code === 'ER_NO_SUCH_TABLE') {
            console.log('Table personal_notes DOES NOT EXIST.');
        }
    } finally {
        process.exit();
    }
}

checkTable();
