const express = require("express");

const router = express.Router();

const {
    getUsers, deleteUser, updateUser
} = require("../controllers/userController");

const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, getUsers);
router.delete("/:id", verifyToken, deleteUser);
router.put("/:id", verifyToken, updateUser);

module.exports = router;
