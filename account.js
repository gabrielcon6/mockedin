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

// const sendCancelationEmail = (email, name) => {
//     sgMail.send({
//         to: email,
//         from: 'andrew@mead.io',
//         subject: 'Sorry to see you go!',
//         text: `Goodbye, ${name}. I hope to see you back sometime soon.`
//     })
// }

module.exports = {
    sendAdminEmail }