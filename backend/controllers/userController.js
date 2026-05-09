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

module.exports = {
    getUsers
};