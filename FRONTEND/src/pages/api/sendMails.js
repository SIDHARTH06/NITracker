import nodemailer from 'nodemailer';

export default  async function handler(req, res) {
    const to='amalkrishna_b200729cs@nitc.ac.in';
    const subject='Test mail';
    const text='This is a test mail';
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amalkrishna02016@gmail.com',
            pass: '#include<iostream>'
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json({message: 'Email sent'});
}
