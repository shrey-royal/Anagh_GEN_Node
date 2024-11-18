const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController")
const userValidationSchema = require("../util/UserValidationSchema")
const zodMiddleware = require("../middleware/ZodMiddleware");
// const authMiddleware = require("../middleware/AuthMiddleware");
const tokenUtil = require("../util/tokenUtil")

router.post("/add", zodMiddleware.validationSchema(userValidationSchema), userController.addUser);
router.get("/", tokenUtil.verifyToken, userController.getAllUsersFromDB);
// router.get("/", authMiddleware.authMiddleware, userController.getAllUsersFromDB);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.get("/filter/:age", userController.getUserByAge);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser);

module.exports = router;