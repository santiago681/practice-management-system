const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const checkRole = require("../middleware/roleMiddleware");

const {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany
} = require("../controllers/companyController");

// Todos autenticados pueden ver
router.get(
    "/",
    verifyToken,
    getCompanies
);

// Solo admin crea
router.post(
    "/",
    verifyToken,
    checkRole("admin"),
    createCompany
);

// Solo admin edita
router.put(
    "/:id",
    verifyToken,
    checkRole("admin"),
    updateCompany
);

// Solo admin elimina
router.delete(
    "/:id",
    verifyToken,
    checkRole("admin"),
    deleteCompany
);

module.exports = router;