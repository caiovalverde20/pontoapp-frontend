# PontoApp Frontend

Este repositório contém o frontend da aplicação **PontoApp**, desenvolvida como parte de um desafio técnico. Ele fornece uma interface para os colaboradores iniciarem e finalizarem turnos, além de visualizarem suas horas trabalhadas de maneira simples e intuitiva.

O backend associado ao projeto pode ser encontrado [aqui](https://github.com/caiovalverde20/pontoapp-backend).

## **Como executar**

1. Clone este repositório:
   ```bash
   git clone https://github.com/caiovalverde20/pontoapp-frontend.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd pontoapp-frontend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. (Opcional) Configure as variáveis de ambiente no arquivo `.env`:
   - **VITE_API_URL**: URL do backend da aplicação (exemplo: `https://pontoapp-backend.onrender.com`)
   - Por padrão vai ser localhost 3000

5. Execute o projeto no modo de desenvolvimento:
   ```bash
   npm run dev
   ```

6. Para gerar a build de produção:
   ```bash
   npm run build
   ```

## **Deploy**

O frontend totalmente integrado com o back está disponível no seguinte link:
[https://pontoapp-frontend.vercel.app](https://pontoapp-frontend.vercel.app)

## **Mudanças**
- O codigo de usuario virou um username, gerado automaticamente de acordo com o nome do usuario, sendo mais intuitivo e fácil de lembrar.
- O sistema agora tem um cadastro proprio
- Agora, os usuários podem acompanhar o total de horas trabalhadas na semana, e dias com 7 horas e meia ou mais de trabalho recebem um destaque visual com cores esverdeadas, promovendo uma sensação de progresso e motivação semanal.
- A feature de dia anteriores foi substituida pela feature semanal falada no topico anterior
- O contador está muito mais chamativo, com cores e maior tamanho

## **Tecnologias utilizadas**
- **React.js**
- **TypeScript**
- **Vite**
- **Styled-Components**
- **React Router**
- **Axios**

## **Branches**

Como é um pequeno projeto de uma pessoa só, todos os commits foram realizados em uma única branch, o que normalmente não é uma boa prática.
