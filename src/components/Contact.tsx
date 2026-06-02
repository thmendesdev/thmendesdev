import { useEffect, useRef, useState } from 'react';
import { setupScrollReveal } from '@/utils/animations';
import { Mail, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation, Trans } from 'react-i18next';
import { WEB3FORMS_CONFIG } from '@/config/web3forms';

const Contact = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    observerRef.current = setupScrollReveal();
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // Preparar dados para Web3Forms
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_CONFIG.accessKey);
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('subject', form.title);
      formData.append('message', form.message);
      formData.append('from_name', form.name);
      formData.append('replyto', form.email);

      const response = await fetch(WEB3FORMS_CONFIG.endpoint, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', title: '', message: '' });
        toast.success(t('messageReceived'), { description: t('thankYou') });
      } else {
        throw new Error('Failed to send message');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      toast.error('Error sending message. Please try again.');
    }
  };

  return (
    <section id="contact" className="section-padding px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
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
                  <a href="mailto:thiagosmmrio@hotmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    thiagosmmrio@hotmail.com
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
                    {t('location')}
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
              className="relative z-[9999] pointer-events-auto p-8 rounded-2xl bg-background border border-border"
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
                    className="relative z-[9999] pointer-events-auto w-full px-4 py-3 rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-form-focus transition-all"
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
                    className="relative z-[9999] pointer-events-auto w-full px-4 py-3 rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-form-focus transition-all"
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
                    name="title"
                    required
                    className="relative z-[9999] pointer-events-auto w-full px-4 py-3 rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-form-focus transition-all"
                    placeholder={t('subjectPlaceholder')}
                    aria-required="true"
                    value={form.title}
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
                    rows={5}
                    className="relative z-[9999] pointer-events-auto w-full px-4 py-3 rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-form-focus transition-all"
                    placeholder={t('messagePlaceholder')}
                    aria-required="true"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="relative z-[9999] pointer-events-auto w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-form-focus"
                disabled={status === 'sending'}
                aria-label="Send message"
              >
                {status === 'sending' ? t('sending') || 'Sending...' : t('sendMessage')}
                <Send size={16} />
              </button>
              {status === 'success' && <p className="text-green-600 mt-4">{t('messageReceived')}</p>}
              {status === 'error' && <p className="text-red-600 mt-4">Error sending message. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
