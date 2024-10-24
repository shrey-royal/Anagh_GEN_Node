const userModel = require("../models/UserModel");

const addUser = async(req, res) => {
    const user = req.body
    if (user.name == undefined || user.email == undefined || user.age == undefined || user.status == undefined) {
        res.status(404).json({
            message: "Data is not correct"
        })
    } else {
        const saveUser = await userModel.create(req.body);

        res.status(201).json({
            message: "Success",
            data: saveUser
        })
    }
}

const getAllUsersFromDB = async(req, res) => {
    const users = await userModel.find()
    res.status(200).json({
        message: "Users list",
        data: users
    })
}

const getUserById = async(req, res) => {
    const user = await userModel.findById(req.params.id);
    if(user != undefined || user != null) {
        res.status(200).json({
            data: user,
            message: "User fetched successfully",
        })
    } else {
        res.status(404).json({
            message: "No user found",
        })
    }
}

const updateUser = async(req, res) => {
    const id = req.params.id;
    const userData = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(id, userData);

    res.status(200).json({
        message: "User updated successfully",
        data: updatedUser
    })
}

const deleteUser = async(req, res) => {
    const id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(id);
    console.log("deletedUser", deletedUser)

    if(deletedUser && deletedUser != null) {
        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser
        })
    } else {
        res.status(400).json({
            message: "User not found"
        })
    }
}

module.exports = {
    addUser,
    getAllUsersFromDB,
    getUserById,
    updateUser,
    deleteUser,
}