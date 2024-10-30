const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/EmployeeController")

router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getAllEmployees);

module.exports = router;