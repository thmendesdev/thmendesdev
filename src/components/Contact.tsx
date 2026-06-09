import { useEffect, useRef, useState } from 'react';
import { setupScrollReveal } from '@/utils/animations';
import { Mail, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation, Trans } from 'react-i18next';
import {
  ContactFormActivationRequiredError,
  submitContactForm,
} from '@/services/submitContactForm';
import {
  trimContactForm,
  validateContactForm,
  type ContactFormData,
} from '@/utils/contactForm';

const Contact = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useTranslation();
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [fieldError, setFieldError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    observerRef.current = setupScrollReveal();
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFieldError('');
    if (status === 'success' || status === 'error') {
      setStatus('idle');
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError('');

    if (honeypot) {
      return;
    }

    const trimmed = trimContactForm(form);
    const validationError = validateContactForm(trimmed, {
      required: t('formErrorRequired'),
      name: t('formErrorName'),
      email: t('formErrorEmail'),
      subject: t('formErrorSubject'),
      message: t('formErrorMessage'),
    });

    if (validationError) {
      setFieldError(validationError);
      toast.error(validationError);
      return;
    }

    setStatus('sending');

    try {
      await submitContactForm(trimmed);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      toast.success(t('messageReceived'), { description: t('thankYou') });
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof ContactFormActivationRequiredError) {
        setStatus('error');
        setFieldError(t('formActivationHint'));
        toast.error(t('formActivationRequired'), {
          description: t('formActivationHint'),
          duration: 12000,
        });
        return;
      }
      setStatus('error');
      toast.error(t('formErrorSend'));
    }
  };

  return (
    <section className="section-padding px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div id="contact" className="text-center mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 bg-secondary rounded-full mb-4">
            {t('getInTouch')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <Trans i18nKey="buildTogether">
              Let's <span className="text-gradient">Build Something Together</span>
            </Trans>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contactIntro')}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">{t('contactInfo')}</h3>
            <p className="text-muted-foreground mb-8">
              {t('contactInfoDesc')}
            </p>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">{t('email')}</h4>
                  <a href="mailto:thiagosmm.freelancer@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    thiagosmm.freelancer@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">{t('location')}</h4>
                  <p className="text-muted-foreground">
                    {t('locationPlace')}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border">
              <h4 className="text-lg font-bold mb-4">{t('letsCollaborate')}</h4>
              <p className="text-muted-foreground mb-4">
                {t('letsCollaborateDesc')}
              </p>
              <p className="text-sm text-muted-foreground">
                <Trans i18nKey="responseTime">
                  Expected response time: <span className="text-foreground font-medium">24 hours</span>
                </Trans>
              </p>
            </div>
          </div>
          <div className="relative">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-8 rounded-2xl bg-background border border-border shadow-sm"
              role="form"
              aria-label="Contact form"
            >
              <h3 className="text-2xl font-bold mb-6">{t('sendMeMessage')}</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('yourName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    minLength={2}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-form-focus transition-all"
                    placeholder={t('namePlaceholder')}
                    aria-required="true"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('yourEmail')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-form-focus transition-all"
                    placeholder={t('emailPlaceholder')}
                    aria-required="true"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t('subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    minLength={3}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-form-focus transition-all"
                    placeholder={t('subjectPlaceholder')}
                    aria-required="true"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-form-focus transition-all"
                    placeholder={t('messagePlaceholder')}
                    aria-required="true"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <input
                type="text"
                name="_honey"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-form-focus disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={status === 'sending'}
                aria-label="Send message"
              >
                {status === 'sending' ? t('sending') : t('sendMessage')}
                <Send size={16} />
              </button>
              {fieldError && <p className="text-red-600 mt-4 text-sm">{fieldError}</p>}
              {status === 'success' && (
                <p className="text-green-600 mt-4">{t('messageReceived')}</p>
              )}
              {status === 'error' && !fieldError && <p className="text-red-600 mt-4">{t('formErrorSend')}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
