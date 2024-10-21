const userData = () => {
    console.log("Hello from user.js");
}

const multiply = (a, b) => {
    return a*b
}

const user_arr = [
    {
        id: 1,
        userName: "Anagh",
        age: 21
    },
    {
        id: 2,
        userName: "Pankaj",
        age: 22
    }
]

const getUserById = (id) => {
    return user_arr.find((user) => user.id === id)
}

module.exports = {
    userData,
    multiply,
    user_arr,
    getUserById
}