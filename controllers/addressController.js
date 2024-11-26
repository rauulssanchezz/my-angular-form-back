const db = require('../config/database');
const Address = require('../models/Address');

exports.getAddressByUser = (req, res) => {
    const {user_id} = req.params;
    db.query('SELECT * FROM address WHERE user_id = ?',[user_id], (err, results) => {
        if(err){
            console.error('Error al obtener las direcciones:',err);
            return res.status(500).send('Error al obtener las direcciones.');
        }
        res.json(results);
    })
}

exports.createAddress = (req, res) => {
    const { user_id, country, city, pc, street, house } = req.body;

    // Validación de los parámetros
    if (isNaN(pc)) {
        return res.status(400).send('El código postal (zc) debe ser un número');
    }

    if (isNaN(user_id)) {
        return res.status(400).send('El user_id debe ser un número');
    }

    if (isNaN(house)) {
        return res.status(400).send('House debe ser un número');
    }

    try {
        // Crea la nueva dirección
        const newAddress = new Address(user_id, country, city, pc, street, house);

        const query = 'INSERT INTO address (user_id, country, city, zc, street, house) VALUES (?, ?, ?, ?, ?, ?)';

        // Llamada correcta a db.query pasando los valores directamente
        db.query(query, [
            newAddress.userId,
            newAddress.country,
            newAddress.city,
            newAddress.pc,
            newAddress.street,
            newAddress.house
        ], (err, results) => {
            if (err) {
                console.error('Error al guardar la dirección:', err);
                return res.status(500).send('Error al guardar la dirección');
            }

            // Devuelve la respuesta correcta con la nueva dirección
            res.status(201).json({
                id: results.insertId,
                user_id: newAddress.userId,
                country: newAddress.country,
                city: newAddress.city,
                zc: newAddress.pc,
                street: newAddress.street,
                house: newAddress.house
            });
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateAddress = (req, res) => {
    const {id} = req.params;
    const { user_id, country, city, pc, street, house } = req.body;

    const query = 'UPDATE address SET user_id = ?, country = ?, city = ?, zc = ?, street = ?, house = ? WHERE id = ?';
    db.query(query, [user_id, country, city, pc, street, house], (err, results) => {
        if (err) {
            console.error('Error al actualizar la dirección:', err);
            return res.status(500).send('Error al actualizar la dirección');
          }
          if (results.affectedRows === 0) {
            return res.status(404).send('Dirección no encontrado');
          }
          res.json({ id, user_id, country, city, pc, street, house });
    })

}

exports.deleteAddress = (req, res) => {
    const {id} = req.params;
    const query = 'DELETE FROM address WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar la dirección:', err);
            return res.status(500).send('Error al eliminar la dirección');
          }
          if (results.affectedRows === 0) {
            return res.status(404).send('Dirección no encontrada');
          }
          res.status(204).send();
    })
}