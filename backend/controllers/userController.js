const db = require("../config/db");

const getUsers = (req, res) => {
    const query = "SELECT id, name, email, role FROM users";

    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).json({ error: "Error al obtener los usuarios" });
        }
        res.json(results);
    });
};

const deleteUser = (req, res) => {

    const { id } = req.params;

    const query = "DELETE FROM users WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al eliminar el usuario" });
        }

        res.json({ message: "Usuario eliminado correctamente" });   

});
};
    
const updateUser = (req, res) => {
    const { id } = req.params;

    const { name, role } = req.body;

    const query = "UPDATE users SET name = ?, role = ? WHERE id = ?";

    db.query(query, [name, role, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar el usuario" });
        }

        res.json({ message: "Usuario actualizado correctamente" });
    });
};  

module.exports = {
    getUsers,
    deleteUser,
    updateUser
};