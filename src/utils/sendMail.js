import nodemailer from 'nodemailer';

const emailconfig = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  service: process.env.EMAIL_SERVICE,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail({ to, subject, body }) {
  const info = await emailconfig.sendMail({
    from: `Posinnove <${process.env.EMAIL_USERNAME}>`,
    to: to,
    subject: subject,
    html: body,
  });

  return info;
}
export default  sendEmail