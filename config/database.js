const mysql = require('mysql2');

// Crear la conexión con la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wardenk13/15/04/2003',
  database: 'MyAnimalShop'
});

db.connect((err) => {

    
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL exitosa');
});

module.exports = db;
