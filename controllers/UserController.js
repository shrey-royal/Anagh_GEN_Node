const userModel = require("../models/UserModel");
const encrypt = require("../util/encrypt");
const tokenUtil = require("../util/tokenUtil");
const cloudinaryController = require("./CloudinaryController");
const multer = require("multer");
const mailUtil = require("../util/mailUtil");

const addUser = async(req, res) => {
    // const user = req.body
    // if (user.name == undefined || user.email == undefined || user.age == undefined || user.status == undefined) {
    //     res.status(404).json({
    //         message: "Data is not correct"
    //     })
    // } else {
    //     const saveUser = await userModel.create(req.body);

    //     res.status(201).json({
    //         message: "Success",
    //         data: saveUser
    //     })
    // }

    const hashedPassword = encrypt.encryptPassword(req.body.password);
    const userObject = Object.assign(req.body, {
        password: hashedPassword
    });

    const saveUser = await userModel.create(userObject);
    await mailUtil.sendMail(saveUser.email, "Welcome", "Welcome to our app");
    //otp

    res.status(201).json({
        message: "success",
        data: saveUser
    })
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

const getUserByAge = async(req, res) => {
    const age = req.params.age;

    const userByAge = await userModel.find({ age: { $gte: age } });
    if(userByAge && userByAge.length > 0) {
        res.status(200).json({
            message: "users filtered by age",
            data: userByAge
        })
    } else {
        res.status(400).json({
            message: "no user found"
        })
    }
}

const loginUser = async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const emailFromUser = await userModel.findOne({ email: email });

        if (emailFromUser) {
            const isPasswordMatched = encrypt.comparePassword(password, emailFromUser.password);
            
            if(isPasswordMatched == true) {
                
                const token = tokenUtil.generateToken(emailFromUser.toObject());
                res.status(200).json({
                    message: "Login Success",
                    data: token,
                })
            } else {
                res.status(400).json({
                    message: "Invalid Password"
                })
            }
        } else {
            res.status(400).json({
                message: "User not found!"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            cb(null, true);
        } else {
            return cb(new Error("Only .png, .jpg and .jpeg formats are supported!"))
        }
    }
}).single("file");

const uploadFile = async(req, res) => {
    try {
        upload(req, res, async(err) => {
            if(err) {
                res.status(500).json({
                    message: err.message
                });
            } else {
                if (req.file) {
                    const result = await cloudinaryController.uploadFile(req.file);
                    
                    res.status(200).json({
                        message: "File uploaded successfully",
                        data: req.file,
                        cloudinaryData: result
                    });
                } else {
                    res.status(400).json({
                        message: "File not found",
                    });
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err,
            error: err
        });
    }
}

module.exports = {
    addUser,
    getAllUsersFromDB,
    getUserById,
    updateUser,
    deleteUser,
    getUserByAge,
    loginUser,
    uploadFile,
}