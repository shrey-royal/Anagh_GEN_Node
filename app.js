const express = require("express")
const app = express()

// server port
const PORT = 3000

//db config
const dbConnection = require("./util/DB")
dbConnection();

app.use(express.json());    //get the user data in req.body as json format

const userRoutes = require("./routes/UserRoutes");
const productCategoryRoutes = require("./routes/ProductCategoryRoutes");
const productRoutes = require("./routes/ProductRoutes");
const employeeRoutes = require("./routes/EmployeeRoutes");
const questionRoutes = require("./routes/QuestionRoutes");
const examRoutes = require("./routes/ExamRoutes");

app.use("/users", userRoutes);
app.use("/category", productCategoryRoutes);
app.use("/products", productRoutes);
app.use("/employees", employeeRoutes);
app.use("/question", questionRoutes);
app.use("/exam", examRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "Home Page"
    });
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})