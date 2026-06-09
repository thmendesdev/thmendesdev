import { CONTACT_FORM_CONFIG } from '@/config/contactForm';
import {
  formatContactEmailBody,
  type ContactFormData,
} from '@/utils/contactForm';

type FormSubmitResponse = {
  success?: string | boolean;
  message?: string;
};

export class ContactFormActivationRequiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContactFormActivationRequiredError';
  }
}

export async function submitContactForm(
  data: ContactFormData
): Promise<void> {
  const response = await fetch(CONTACT_FORM_CONFIG.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      _subject: data.subject,
      _replyto: data.email,
      message: formatContactEmailBody(data),
      _template: 'box',
      _captcha: 'false',
    }),
  });

  let result: FormSubmitResponse = {};
  try {
    result = await response.json();
  } catch {
    // Non-JSON body on some error responses
  }

  if (!response.ok) {
    throw new Error(
      result.message ?? `Form submit failed (${response.status})`
    );
  }

  const succeeded = result.success === true || result.success === 'true';

  if (!succeeded) {
    const apiMessage = result.message ?? 'Form submit failed';
    if (/activation/i.test(apiMessage)) {
      throw new ContactFormActivationRequiredError(apiMessage);
    }
    throw new Error(apiMessage);
  }
}
