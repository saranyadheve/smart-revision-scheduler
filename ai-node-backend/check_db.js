const db = require('./db');

async function check() {
    try {
        console.log("Checking database connection...");
        const [rows] = await db.execute('SHOW TABLES LIKE "personal_notes"');
        if (rows.length === 0) {
            console.log("Table 'personal_notes' NOT FOUND. Creating it...");
            await db.execute(`
                CREATE TABLE personal_notes (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    content TEXT,
                    user_id INT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
            console.log("Table 'personal_notes' created successfully.");
        } else {
            console.log("Table 'personal_notes' exists. Checking structure...");
            const [structure] = await db.execute('DESCRIBE personal_notes');
            console.table(structure);
        }
    } catch (err) {
        console.error("Database check failed:", err.message);
    } finally {
        process.exit();
    }
}

check();
