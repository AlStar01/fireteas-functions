const nodemailer = require('nodemailer');

const gmailEmail = GetEnvironmentVariable("GMAIL_EMAIL");
const gmailPassword = GetEnvironmentVariable("GMAIL_PASSWORD");
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};

function sendWelcomeEmail(contact) {
    const { name, email, subject, message } = contact;

    const mailOptions = {
        from: gmailEmail,
        to: gmailEmail,
        replyTo: `${name} <${email}>`,
        subject: subject,
        text: `Contact Request - ${name} <${email}> - ${message}`,
        html: `
            Contact Request

            <div><strong>Name:</strong> ${name}</div>
            <br />
            <div><strong>Name:</strong> ${email}</div>
            <br />
            <div><strong>Name:</strong> ${subject}</div>
            <br />
            <div><strong>Name:</strong> ${message}</div>

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