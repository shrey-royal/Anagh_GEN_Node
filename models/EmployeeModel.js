const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    degree: [
        {
            name: {
                type: String,
            },
            passingYear: {
                type: Number
            }
        }
    ],
    status: {
        type: String,
        enum: ["active", "not active", "pending"]
    }
})

module.exports = mongoose.model("employee", employeeSchema)