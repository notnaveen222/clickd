// lib/nodemailer-actions.ts
import nodemailer from "nodemailer";

const pass = process.env.MAILTRAP_TOKEN_DEMO;

if (!pass) {
  throw new Error("MAILTRAP_TOKEN_DEMO is missing");
}

const transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  secure: false,
  auth: {
    user: "api",
    pass: pass,
  },
});

export async function sendShippedMail(toEmail: string, orderId: string) {
  console.log(toEmail, orderId);
  //   if (!toEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail)) {
  //     throw new Error("Invalid recipient email");
  //   }
  //   if (!orderId) {
  //     throw new Error("orderId required");
  //   }

  return transport.sendMail({
    from: '"Clickd E-Photobooth" <no-reply@demomailtrap.co>', // use your verified domain
    to: toEmail,
    subject: "Your order has been shipped ✈️",
    text: `Thanks for your order! Order #${orderId} has been shipped.`,
    html: `
      <div style="font-family:system-ui,Arial;">
        <h2>Thanks for your order!</h2>
        <p>Your order <b>#${orderId}</b> has been <b>shipped</b>.</p>
        <hr />
        <small>If you didn't place this order, contact support@clickd.com</small>
      </div>
    `,
  });
}
