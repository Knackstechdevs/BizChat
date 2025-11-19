export function createWelcomeEmailTemplate(name, clientURL) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Messenger</title>
</head>
<body
  style="
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
  "
>
  <div
    style="
      background: linear-gradient(to right, #36d1dc, #5b86e5);
      padding: 30px;
      text-align: center;
      border-radius: 12px 12px 0 0;
    "
  >
    <img
      src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_5386-118344.jpg?t=st=1741298628~hmac=0d076f885d7095f05bc8d34136cd6d64749455f8cb5f29a924281bafc11b96c&w=1480"
      alt="Messenger Logo"
      style="
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
        border-radius: 50%;
        background-color: white;
        padding: 10px;
      "
    />
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">
      Welcome to BizChat!
    </h1>
  </div>

  <div
    style="
      background-color: #ffffff;
      padding: 35px;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    "
  >
    <p style="font-size: 18px; color: #5b86e5;">
      <strong>Hello ${name},</strong>
    </p>
    <p>
      We're excited to have you join our messaging platform! Messenger connects you with friends, family and colleagues in real-time, no matter where you are.
    </p>

    <div
      style="
        background-color: #f8f9fa;
        padding: 25px;
        border-radius: 10px;
        margin: 25px 0;
        border-left: 4px solid #36d1dc;
      "
    >
      <p style="font-size: 16px; margin: 0 0 15px 0;">
        <strong>Get started in just a few steps:</strong>
      </p>
      <ul style="padding-left: 20px; margin: 0;">
        <li style="margin-bottom: 10px;">Set up your profile pictures</li>
        <li style="margin-bottom: 10px;">Find and add your contacts</li>
        <li style="margin-bottom: 10px;">Start a conversation</li>
        <li style="margin-bottom: 0;">Share photos, videos, and more</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a
        href="${clientURL}"
        style="
          background: linear-gradient(to right, #36d1dc, #5b86e5);
          color: white;
          text-decoration: none;
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 500;
          display: inline-block;
        "
        >Messenger</a
      >
    </div>

    <p style="margin-bottom: 5px;">
      If you need help or have questions, we're always here to assist you,
    </p>
    <p style="margin-top: 15px; text-align: left;">
      Best regards
    </p>
    <p style="margin-top: 10px;">
      The Manager Team
    </p>
  </div>

  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      align-items: center;
    "
  >
    <p style="margin-top: 30px; color: gray;">© 2025 Messenger - All Rights Reserved.</p>
    <div
      style="
        display: flex;
        gap: 20px;
        color: blue;
        align-items: center;
        text-align: center;
      "
    >
      <p>Privacy Policy</p>
      <p>Terms of Service</p>
      <p>Contact US</p>
    </div>
  </div>
</body>
</html>`;
}
