const nodemailer = require("nodemailer");

let transporter;

async function createTransporter() {
    if (transporter) {
        return transporter;
    }

    const testAccount =
        await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    console.log("ETHEREAL LOGIN:");
    console.log(testAccount.user);
    console.log(testAccount.pass);

    return transporter;
}

module.exports = {
    createTransporter
};