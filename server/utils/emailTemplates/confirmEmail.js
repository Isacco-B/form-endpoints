import { sendEmail } from "../helpers.js";

export const sendConfirmEmail = async (to, confirmLink, token, origin) => {
  const text = `
  Thank you for using FormEndpoints! You're only one step away from making forms on ${origin} functional. Click 'Activate Form' to begin receiving submissions from this form.\n\n
  Use this random-like string ${token} to replace your naked email address in the action attribute of your form.\n\n
  Activate Form: ${confirmLink}\n\n
  Regards,\n
  Your Team`;

  const html = `
    <html>
    <body>
      <p>Thank you for using <strong>FormEndpoints!</strong> You're only one step away from making forms on <strong>${origin}</strong> functional. Click <strong>Activate Form</strong> to begin receiving submissions from this form.</p>
      <p>Use this random-like string <strong>${token}</strong> to replace your naked <strong>email address</strong> in the action attribute of your form.</p>
      <br>
      <a
      href="${confirmLink}"
      target="_blank"
      rel="noopener noreferrer"
    >
      ACTIVATE FORM
    </a>
      <br>
      <p>Regards,</p>
      <p>Your Team</p>
    </body>
    </html>
  `;

  await sendEmail({
    to,
    subject: `Action Required: Activate FormSubmit on ${origin}`,
    text,
    html,
  });
};
