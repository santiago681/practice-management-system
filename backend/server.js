const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

app.get("/profile", verifyToken, (req, res) => {
    res.json({
        message: "Ruta protegida",
        user: req.user
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get("/users", verifyToken, (req, res) => {
    const query = "SELECT * FROM users";

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error al obtener los usuarios" });
        } else {
            res.json(results);
        }

    });
});