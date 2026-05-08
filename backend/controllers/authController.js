const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    const { name, email, password, role } = req.body;

    try {

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (name, email, password, role)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            query,
            [name, email, hashedPassword, role],
            (err, result) => {

                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        error: "Error al registrar usuario"
                    });
                }

                res.status(201).json({
                    message: "Usuario registrado correctamente"
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            error: "Error del servidor"
        });

    }

};

const login = (req, res) => {

    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, results) => {

        if (err) {
            return res.status(500).json({
                error: "Error del servidor"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                error: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET || "secretkey",
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login exitoso",
            token
        });

    });

};

module.exports = {
    register,
    login
};