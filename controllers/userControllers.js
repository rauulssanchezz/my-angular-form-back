const db = require('../config/database');
const User = require('../models/User');

//Obtener todos los usuarios
exports.getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if(err){
            console.error('Error al obtener usuarios:',err);
            return res.status(500).send('Error al obtener usuarios');
        }
        res.json(results);
    })
}

//Existe Usuario
exports.userExists = (req, res) => {
    const { gmail } = req.params;
    const query = 'SELECT * FROM users WHERE gmail = ?';
    db.query(query, [gmail], (err, results) => {
        if(err){
            console.error('Error al obtener usuario:', err);
            return res.status(500).send('Error al obtener el usuario');
        }
        if(results.length == 0){
            return res.status(404).send('Usuario no encontrado'+gmail);
        }
        res.json(results[0]);
    });
}

//Crear un nuevo usuario
exports.createUser = (req,res) => {
    const { name, gmail, password } = req.body;

    try{
        const newUser = new User(name, gmail, password);

        const query = 'INSERT INTO users (user_name, gmail, user_password) VALUES (?, ?, ?)';
        db.query(query, [newUser.name, newUser.gmail, newUser.password], (err, results) => {
            if(err){
                console.error('Error al crear el usuario:', err);
                return res.status(500).send('Error al crear al usuario');
            }
            res.status(201).json({id: results.insertId, name, gmail, password });
        });
    } catch(error){
        res.status(400).send(error.message);
    }

}


//Obtener usuario por Id
exports.getUserByCredentials = (req, res) => {
    const { gmail, password } = req.query;
    const query = 'SELECT * FROM users WHERE gmail = ? AND user_password = ?';
    db.query(query, [gmail,password], (err, results) => {
        if(err){
            console.error('Error al obtener usuario:', err);
            return res.status(500).send('Error al obtener el usuario');
        }
        if(results.length == 0){
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(results[0]);
    });
}


//Actualizar usuario por Id
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, gmail, password } = req.body;

    const query = 'UPDATE users SET user_name = ?, gmail = ?, user_password = ? WHERE id = ?';

    db.query(query, [name, gmail, password], (err, results) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).send('Error al actualizar usuario');
          }
          if (results.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado');
          }
          res.json({ id, name, gmail, password });
    });
}

// Eliminar usuario por ID
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al eliminar usuario:', err);
        return res.status(500).send('Error al eliminar usuario');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.status(204).send();
    });
  };