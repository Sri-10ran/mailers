
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const PORT = 5000;
app.use(express.static(path.join(__dirname, 'build')));
// Middleware
app.use(cors());
app.use(bodyParser.json());



// Email route
app.post('/send-email', (req, res) => {
  const { name, recipient, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bathranpro@gmail.com',
      pass: 'jrut ikvu oshd kduv', // Replace with app-specific password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `From ${name} <bathranpro@gmail.com>`,
    to: recipient,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Failed to send email');
    }
    res.status(200).send('Email sent successfully!');
  });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
