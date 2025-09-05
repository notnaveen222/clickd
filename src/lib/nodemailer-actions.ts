// lib/nodemailer-actions.ts
import nodemailer from "nodemailer";

const pass = process.env.MAILTRAP_TOKEN;

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
export async function sendConfirmationMail(
  email: string,
  client_order_id: string
) {
  return transport.sendMail({
    from: '"Clickd E-Photobooth" <no-reply@clickd.store>',
    to: email,
    subject: "Your order has been Confirmed ✅",
    text: `Thanks for your order! Order #${client_order_id} has been confirmed, we'll send you a mail once it has been shipped.`,
    html: `
  <div style="background-color:#f9f9f9; padding:40px; font-family:system-ui, Arial, sans-serif; text-align:center;">
    <div style="background:#00C950; border-radius:12px; max-width:500px; margin:auto; padding:40px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      
      
      <!-- Heading -->
      <h2 style="color:white; font-size:22px; margin-bottom:10px;">
        Your Order is Confirmed!
      </h2>
      
      <!-- Subtext -->
      <p style="color:white; font-size:15px; margin:0 0 15px;">
        Your order has been received. You will receive a email once the shipment is dispatched.</b>
      </p>
      
      <!-- Order ID -->
      <p style="color:white; font-size:14px; margin-bottom:25px;">
        <b>Your Order ID:</b> ${client_order_id}
      </p>
      
      
      
      <hr style="margin:30px 0; border:none; border-top:1px solid #e5e7eb;" />
      
      <!-- Footer -->
      <small style="color:white; font-size:12px;">
        If you didn't place this order, please contact <a href="mailto:support@clickd.com" style="color:white; text-decoration:none;">clickd.ofc@gmail.com</a>
      </small>
    </div>
  </div>
`,
  });
}

export async function sendShippedMail(toEmail: string, orderId: string) {
  //   if (!toEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail)) {
  //     throw new Error("Invalid recipient email");
  //   }
  //   if (!orderId) {
  //     throw new Error("orderId required");
  //   }

  return transport.sendMail({
    from: '"Clickd E-Photobooth" <no-reply@clickd.store>',
    to: toEmail,
    subject: "Your order has been shipped ✈️",
    text: `Thanks for your order! Order #${orderId} has been shipped.`,
    html: `
  <div style="background-color:#f9f9f9; padding:40px; font-family:system-ui, Arial, sans-serif; text-align:center;">
    <div style="background:#00C950; border-radius:12px; max-width:500px; margin:auto; padding:40px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      
      
      <!-- Heading -->
      <h2 style="color:white; font-size:22px; margin-bottom:10px;">
        Your Order is Shipped!
      </h2>
      
      <!-- Subtext -->
      <p style="color:white; font-size:15px; margin:0 0 15px;">
        Your order has been shipped and will reach you within 3-5 business days.</b>.
      </p>
      
      <!-- Order ID -->
      <p style="color:white; font-size:14px; margin-bottom:25px;">
        <b>Your Order ID:</b> ${orderId}
      </p>
      
      
      
      <hr style="margin:30px 0; border:none; border-top:1px solid #e5e7eb;" />
      
      <!-- Footer -->
      <small style="color:white; font-size:12px;">
        If you didn't place this order, please contact <a href="mailto:support@clickd.com" style="color:white; text-decoration:none;">clickd.ofc@gmail.com</a>
      </small>
    </div>
  </div>
`,
  });
}
