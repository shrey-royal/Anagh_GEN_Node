const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController")
const userValidationSchema = require("../util/UserValidationSchema")
const zodMiddleware = require("../middleware/ZodMiddleware");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/add", zodMiddleware.validationSchema(userValidationSchema), userController.addUser);
router.get("/", authMiddleware.authMiddleware, userController.getAllUsersFromDB);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.get("/filter/:age", userController.getUserByAge);
router.delete("/:id", userController.deleteUser);

module.exports = router;