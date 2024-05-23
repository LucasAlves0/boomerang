
Pré-requisitos

MySQL Community Server 8.4.0 LTS
Node version 14.x
Clonar o repositório

Instalar os pacotes

npm i

Configurar .env

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZW1lcmdpbmctcGlrYS05MS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_MYHyTf2ING41KWNtEVYiiQSjiwt0MRac1JmJctMUmy
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Isto foi inserido por `prisma init`:
# Variáveis de ambiente declaradas neste arquivo são disponibilizadas automaticamente para o Prisma.
# Veja a documentação para mais detalhes: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma suporta o formato de string de conexão nativo para PostgreSQL, MySQL, SQLite, SQL Server, MongoDB e CockroachDB.
# Consulte a documentação para todas as opções de string de conexão: https://pris.ly/d/connection-strings

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dndw6ocru"
STRIPE_SECRET_KEY=sk_test_51PHrbBP7G0ehzA0i4jYQnFjLkeXCZ36zFiiHXm7Uzak31Ioy1vavvlh0macOM3rOpg20yEc7dN7Zbsw43pgQQ80c00dpsHiWZL
FRONTEND_STORE_URL=http://localhost:3001

Iniciando o db no MySQL e gerando com o Prisma

npx prisma init

datasource db {
  provider = "mysql"
  url      = "mysql://meu_usuario:minha_senha@localhost:3306/meu_banco_de_dados"
}

CREATE DATABASE meu_banco_de_dados;

npx prisma generate
npx prisma db push

Inicie o projeto

npm run dev

Comandos

Executando comandos com npm npm run [command]
comando 	descrição
dev 	Inicia uma instância de desenvolvimento do aplicativo