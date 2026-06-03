const db = require("../config/db");

// Obtener empresas
const getCompanies = (req, res) => {

    const query = "SELECT * FROM companies";

    db.query(query, (err, results) => {

        if (err) {
            return res.status(500).json({
                error: "Error al obtener empresas"
            });
        }

        res.json(results);

    });

};

// Crear empresa
const createCompany = (req, res) => {

    const { name, email, phone, address } = req.body;

    const query = `
        INSERT INTO companies
        (name, email, phone, address)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [name, email, phone, address],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: "Error al crear empresa"
                });
            }

            res.status(201).json({
                message: "Empresa creada correctamente"
            });

        }
    );

};

// Actualizar empresa
const updateCompany = (req, res) => {

    const { id } = req.params;

    const { name, email, phone, address } = req.body;

    const query = `
        UPDATE companies
        SET name = ?, email = ?, phone = ?, address = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [name, email, phone, address, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: "Error al actualizar empresa"
                });
            }

            res.json({
                message: "Empresa actualizada correctamente"
            });

        }
    );

};

// Eliminar empresa
const deleteCompany = (req, res) => {

    const { id } = req.params;

    const query = "DELETE FROM companies WHERE id = ?";

    db.query(query, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: "Error al eliminar empresa"
            });
        }

        res.json({
            message: "Empresa eliminada correctamente"
        });

    });

};

module.exports = {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany
};