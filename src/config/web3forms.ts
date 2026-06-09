// Web3Forms — recipient is set in your dashboard for this access key.
// Confirm thiagosmm.freelancer@gmail.com at https://web3forms.com
export const WEB3FORMS_CONFIG = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey:
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ??
    '4ba942cf-dbf8-4a90-bbe7-0a018eb58c54',
  recipientEmail: 'thiagosmm.freelancer@gmail.com',
};