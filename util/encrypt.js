const bcrypt = require("bcrypt");
const saltRounds = 10;

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword
}

const decryptPassword = (password, hash) => {
    const flag = bcrypt.compareSync(password, hash);
    return flag;
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    encryptPassword,
    decryptPassword,
    comparePassword,
}