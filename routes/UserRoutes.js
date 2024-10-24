const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController")

router.post("/add", userController.addUser);
router.get("/", userController.getAllUsersFromDB);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;