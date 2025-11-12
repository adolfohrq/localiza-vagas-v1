# Configuração do Ngrok para Acesso Externo

Este documento descreve como configurar e usar o Ngrok para expor sua aplicação Next.js para acesso público externo.

## Pré-requisitos

- Projeto Next.js configurado
- Node.js e npm instalados
- Conta no Ngrok (gratuita ou paga)

## Instalação

O Ngrok já está configurado como dependência de desenvolvimento no projeto. Para instalá-lo, execute:

```bash
npm install
```

## Configuração do Token de Autenticação

Para usar o Ngrok, você precisa configurar seu token de autenticação. Siga estas etapas:

1. Crie o arquivo de configuração do Ngrok:

   **Windows:**
   ```bash
   mkdir -p "$env:USERPROFILE\.ngrok2"
   echo "authtoken: 2jkgOpISslJk9id8WoCjCvi92Vz_7m4HDqwgTmpcd9pzuwiC9" > "$env:USERPROFILE\.ngrok2\ngrok.yml"
   ```

   **macOS/Linux:**
   ```bash
   mkdir -p ~/.ngrok2
   echo "authtoken: 2jkgOpISslJk9id8WoCjCvi92Vz_7m4HDqwgTmpcd9pzuwiC9" > ~/.ngrok2/ngrok.yml
   ```

2. Alternativamente, você pode configurar o token diretamente via linha de comando:

   ```bash
   npx ngrok authtoken 2jkgOpISslJk9id8WoCjCvi92Vz_7m4HDqwgTmpcd9pzuwiC9
   ```

## Uso

### Método 1: Executar o Ngrok separadamente

1. Inicie sua aplicação Next.js em um terminal:
   ```bash
   npm run dev
   ```

2. Em outro terminal, inicie o Ngrok:
   ```bash
   npm run ngrok
   ```

### Método 2: Executar o Ngrok e a aplicação simultaneamente (opcional)

Se você quiser iniciar tanto a aplicação quanto o Ngrok com um único comando, você pode instalar o pacote `concurrently` e adicionar um script personalizado ao seu `package.json`:

```bash
npm install --save-dev concurrently
```

E adicionar ao `package.json`:
```json
"scripts": {
  "dev:public": "concurrently \"npm run dev\" \"npm run ngrok\""
}
```

Então execute:
```bash
npm run dev:public
```

## Acessando a URL Pública

Quando o Ngrok é iniciado, ele exibirá informações no terminal, incluindo a URL pública. Será algo como:

```
Forwarding https://a1b2c3d4.ngrok.io -> http://localhost:3000
```

Use a URL `https://a1b2c3d4.ngrok.io` para acessar sua aplicação de qualquer lugar.

## Observações Importantes

1. A URL do Ngrok muda cada vez que você reinicia o serviço, a menos que você tenha uma conta paga.
2. Algumas funcionalidades podem não funcionar corretamente através do Ngrok devido a restrições de CORS ou outras configurações de segurança.
3. Lembre-se de que o Ngrok expõe sua aplicação local à internet, então tenha cuidado com dados sensíveis.

## Solução de Problemas

- **Erro de autenticação**: Verifique se o token de autenticação está configurado corretamente.
- **Porta já em uso**: Certifique-se de que a porta 3000 não está sendo usada por outro serviço.
- **Conexão recusada**: Verifique se sua aplicação Next.js está em execução na porta 3000. 