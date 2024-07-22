/* ------------------- file which provide connection to db ------------------ */
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/content.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Database connected!');
});

module.exports = db;
