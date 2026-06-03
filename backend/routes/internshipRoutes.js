const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const checkRole = require("../middleware/roleMiddleware");

const {
    getInternships,
    createInternship,
    updateInternship,
    deleteInternship
} = require("../controllers/internshipController");

// ver prácticas 
router.get(
    "/",
    verifyToken,
    getInternships
);

// crear práctica
router.post(
    "/",
    verifyToken,
    checkRole("admin"),
    createInternship
);

// editar práctica
router.put(
    "/:id",
    verifyToken,
    checkRole("admin"),
    updateInternship
);

// eliminar práctica
router.delete(
    "/:id",
    verifyToken,
    checkRole("admin"),
    deleteInternship
);

module.exports = router;
