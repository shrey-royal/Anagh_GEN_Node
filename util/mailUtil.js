const mailer = require("nodemailer");
const path = require("path");

const sendMail = async (to, subject, text) => {
    const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "your_email", // Ensure this is your email
            pass: "your_app_password" // Your 16-character app password
        },
    });


    const mailOptions = {
        from: "shreykadia.royal@gmail.com",
        to: to,
        subject: subject,
        html: `<h1>${text}<br></h1>`,
        attachments: [
            {
                filename: 'nyan.gif',
                path: path.join(__dirname, '../assets/nyan.gif'),
            }
        ]
    };

    try {
        const mailRes = await transporter.sendMail(mailOptions);
        console.log('Email Sent: ', mailRes);
        return mailRes;
    } catch (err) {
        console.error('Error sending mail: ', error);
        throw err;
    }
}

module.exports = {
    sendMail,
}