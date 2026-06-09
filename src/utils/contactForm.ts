export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function formatContactEmailBody(data: ContactFormData): string {
  return `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  data: ContactFormData,
  messages: {
    required: string;
    name: string;
    email: string;
    subject: string;
    message: string;
  }
): string | null {
  const name = data.name.trim();
  const email = data.email.trim();
  const subject = data.subject.trim();
  const message = data.message.trim();

  if (!name || !email || !subject || !message) {
    return messages.required;
  }
  if (name.length < 2) {
    return messages.name;
  }
  if (!EMAIL_PATTERN.test(email)) {
    return messages.email;
  }
  if (subject.length < 3) {
    return messages.subject;
  }
  if (message.length < 10) {
    return messages.message;
  }
  return null;
}

export function trimContactForm(data: ContactFormData): ContactFormData {
  return {
    name: data.name.trim(),
    email: data.email.trim(),
    subject: data.subject.trim(),
    message: data.message.trim(),
  };
}
