import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: i18n.language === lang.code ? '2px solid #0070f3' : '1px solid #ccc',
            background: i18n.language === lang.code ? '#e0e7ff' : '#fff',
            cursor: 'pointer',
            fontWeight: i18n.language === lang.code ? 'bold' : 'normal',
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher; 