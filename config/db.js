
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'mysql.infocimol.com.br', 
    user: 'infocimol26',     
    password: 'laurasmc2024',    
    database: 'infocimol26' 
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        return;
    }
    console.log('Conexão com o MySQL estabelecida!');
});

module.exports = db;