const express = require("express")
const app = express()

// server port
const PORT = 3000

//db config
const dbConnection = require("./util/DB")
dbConnection();

app.use(express.json());    //get the user data in req.body as json format

const userRoutes = require("./routes/UserRoutes");
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Home Page"
    });
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})