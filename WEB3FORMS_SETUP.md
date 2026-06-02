# Configuração do Web3Forms para Formulário de Contato

## Por que mudamos para Web3Forms?

O **Web3Forms** é uma alternativa mais confiável ao Formspree, com:
- ✅ **250 envios gratuitos/mês** (vs 50 do Formspree)
- ✅ **Sem problemas de CORS**
- ✅ **API mais simples e confiável**
- ✅ **Resposta JSON clara**
- ✅ **Sem redirecionamentos problemáticos**

## Como configurar:

### 1. Obter Access Key do Web3Forms
1. Acesse [https://web3forms.com](https://web3forms.com)
2. Clique em **"Get Access Key"**
3. Copie a chave gerada (algo como: `12345678-1234-1234-1234-123456789abc`)

### 2. Configurar no projeto
1. Abra o arquivo `src/config/web3forms.ts`
2. Substitua `YOUR_ACCESS_KEY` pela sua chave real:

```typescript
export const WEB3FORMS_CONFIG = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '12345678-1234-1234-1234-123456789abc', // Sua chave real aqui
};
```

### 3. Testar o formulário
1. Execute `npm run dev`
2. Acesse a página de contato
3. Preencha e envie o formulário
4. Verifique se recebeu o email

## Vantagens do Web3Forms:

✅ **250 envios gratuitos/mês**  
✅ **Sem problemas de CORS**  
✅ **API REST simples**  
✅ **Resposta JSON clara**  
✅ **Sem redirecionamentos**  
✅ **Proteção anti-spam**  

## Como funciona:

1. **Usuário preenche o formulário**
2. **Dados são enviados para Web3Forms**
3. **Web3Forms envia email para você**
4. **Resposta JSON confirma sucesso**

## Próximos passos:
1. Configure o Web3Forms seguindo os passos acima
2. Teste o formulário
3. Se precisar de mais de 250 envios/mês, considere o plano pago

## Alternativas se ainda houver problemas:
- **Netlify Forms**: Se hospedar no Netlify (100 envios/mês)
- **EmailJS**: 200 envios/mês (que você já usava)
- **FormSubmit**: 1000 envios/mês gratuitos 