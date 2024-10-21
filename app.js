const express = require("express")
const app = express()

const PORT = 3000

const users = [
    {
        id: 1,
        userName: "Anagh",
        age: 21
    },
    {
        id: 2,
        userName: "Pankaj",
        age: 22
    },
    {
        id: 3,
        userName: "Hritik",
        age: 23
    },
    {
        id: 4,
        userName: "Suresh",
        age: 19
    },
    {
        id: 5,
        userName: "Meet",
        age: 23
    },
    {
        id: 6,
        userName: "Mahendra",
        age: 24
    }
]

app.get("/users", (req, res) => {
//     console.log("user get api called");
//     res.json({
//         "msg": "api called"
//     });

    res.status(200).json({
        data: users,
        message: "User list fetched successfully!"
    })
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})