const cloudinary = require("cloudinary").v2;

const uploadFile = async(file) => {
    cloudinary.config({
        cloud_name: "dbywnnf4p",
        api_key: "397995234293722",
        api_secret: "Is-2LnqarAqkPmmD2F7cZ-tglT0"
    })

    const result = await cloudinary.uploader.upload(file.path);
    console.log(result);
    return result;
}

module.exports = {
    uploadFile
}