const { createTransporter } = require("../mail");

const sendPasswordResetEmail = async (
    email,
    resetLink
) => {
    const transporter =
        await createTransporter();

    const info = await transporter.sendMail({
        from:
            '"Ars Coloris" <noreply@arscoloris.pl>',

        to: email,

        subject: "Reset hasła Ars Coloris",

        html: `
            <h2>Reset hasła</h2>

            <p>Kliknij poniższy link:</p>

            <a href="${resetLink}">
                ${resetLink}
            </a>

            <p>Link ważny jest 30 minut.</p>
        `
    });

    return info;
};

module.exports = {
    sendPasswordResetEmail
};