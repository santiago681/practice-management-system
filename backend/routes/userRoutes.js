const express = require("express");

const router = express.Router();

const {
    getUsers, deleteUser, updateUser
} = require("../controllers/userController");
const checkRole = require("../middleware/roleMiddleware");  
const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/",
    verifyToken,
    checkRole("admin"),
    getUsers
);
router.delete("/:id", verifyToken, checkRole("admin"), deleteUser);
router.put("/:id", verifyToken, checkRole("admin"), updateUser);

module.exports = router;
