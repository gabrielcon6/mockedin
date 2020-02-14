const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.sendgridAPIKey)

const sendAdminEmail = (email, name) => {
    sgMail.send({
        to: 'gabrielcon6cao@gmail.com',
        from: email,
        subject: 'I have updated my profile!',
        text: `Hello! I have now updated my MockedIn profile. Thanks, ${name}.`
    })
}

module.exports = {
    sendAdminEmail }