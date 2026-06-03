const db = require("../config/db");

const getInternships = (req, res) => {

    const query = `
        SELECT
            internships.*,
            companies.name AS company_name,
            users.name AS student_name
        FROM internships
        LEFT JOIN companies
            ON internships.company_id = companies.id
        LEFT JOIN users
            ON internships.student_id = users.id
    `;

    db.query(query, (err, results) => {

        if (err) {
            return res.status(500).json({
                error: "Error al obtener prácticas"
            });
        }

        res.json(results);
    });

};

// Crear práctica

const createInternship = (req, res) => {

    const {
        title,
        description,
        company_id,
        student_id,
        start_date,
        end_date
    } = req.body;

    const query = `
        INSERT INTO internships
        (title, description, company_id, student_id, start_date, end_date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,[
            title,
            description,
            company_id,
            student_id,
            start_date,
            end_date
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Error al crear práctica"
                });
            }
            res.status(201).json({
                message: "Práctica creada exitosamente"
            });
        }
    );
};

// Actualizar práctica

const updateInternship = (req, res) => {
    const { id } = req.params;

    const {
        title,
        description,
        status,
    } = req.body;

    const query = `
        UPDATE internships
        SET title = ?, description = ?, status = ?
        WHERE id = ?
    `;

    db.query(
        query, [title, description, status, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Error al actualizar práctica"
                });
            }
            res.json({
                message: "Práctica actualizada exitosamente"
            });
        }
    );
};

// Eliminar práctica

const deleteInternship = (req, res) => {
    const { id } = req.params;

    const query = `
        DELETE FROM internships
        WHERE id = ?
    `;

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Error al eliminar práctica"
            });
        }
        res.json({
            message: "Práctica eliminada exitosamente"
        });
    });
};

module.exports = {
    getInternships,
    createInternship,
    updateInternship,
    deleteInternship
};