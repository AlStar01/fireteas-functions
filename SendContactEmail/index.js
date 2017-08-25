const nodemailer = require('nodemailer');

const gmailEmail = GetEnvironmentVariable("GMAIL_EMAIL");
const gmailPassword = GetEnvironmentVariable("GMAIL_PASSWORD");
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

module.exports = function (context, req) {
    if (req.body && 
        req.body.name && 
        req.body.email && 
        req.body.subject && 
        req.body.message) {
            
        const contact = req.body;

        sendWelcomeEmail(contact)
            .then((sentMessageInfo) => {
                context.res = {
                    body: true
                };

                context.log(JSON.stringify(sentMessageInfo));
                context.done();
            })
            .catch(() => {
                context.res = {
                    status: 404,
                    body: "Not Found"
                };
            })
    } else {
        context.res = {
            status: 404,
            body: "Not Found"
        };

        context.done();
    }
};

function sendWelcomeEmail(contact) {
    const { name, email, subject, message } = contact;

    const mailOptions = {
        from: gmailEmail,
        to: gmailEmail,
        replyTo: `${name} <${email}>`,
        subject: subject,
        text: `Fireteas Contact Request - ${name} <${email}> - ${message}`,
        html: `
            <div>Fireteas Contact Request</div>

            <div><strong>Name:</strong> ${name}</div>
            <div><strong>Email:</strong> ${email}</div>
            <div><strong>Subject:</strong> ${subject}</div>
            <div><strong>Message:</strong> ${message}</div>

            <br />
            <br />

            Thanks!
        `
    };

    return mailTransport.sendMail(mailOptions);

}

function GetEnvironmentVariable(name) {
    return process.env[name];
}