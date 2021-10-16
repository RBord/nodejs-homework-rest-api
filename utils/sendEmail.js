const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_KEY } = process.env
sgMail.setApiKey(SENDGRID_KEY)

const email = {
  to: 'zveryga07@gmail.com',
  from: 'rostyslavbord@gmail.com',
  subject: 'Budesh v otvete',
  html: `<p><strong>Tobi glina!</strong></p>`,
}

const sendEmail = async data => {
  const email = { ...data, from: 'rostyslavbord@gmail.com' }
  await sgMail.send(email)
}

module.exports = sendEmail
