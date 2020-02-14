const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'gabrielcon6cao@gmail.com',
    from: 'gabrielcon6cao@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you.'
})