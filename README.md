



# Doutor Agenda

## 🏥 O que é a Aplicação
É um SaaS (Software como Serviço) que gerencia clínicas de um hospital. Mostrando pacientes, médicos, consultas, faturamento e mais.

![Demo da aplicação](https://github.com/Adadezer/SaaS-Clinicas/blob/main/doutor-agenda/public/saasClinicas.gif)


## 🩺 Detalhes da aplicação
Na plataforma é possível adicionar, editar, e excluir médicos e pacientes da clínica. 
Agendar consultas, filtrar e visualizar histórico de pacientes, e visualizar faturamento da clínica através de um gráfico, assim como também simular o pagamento do plano e logar com sua própria conta do google.


## 💻 Tecnologias Utilizadas
- Typescript
- React
- Nextjs
- Shadcn
- Talwind css
- DrizzleORM
- Postgresql
- Stripe
- BetterAuth

## ⚙️ Como Utilizar

 - Você pode acessar a aplicação [clicando nesse link](https://saas-clinicas.vercel.app/)
- Faça login ou crie uma conta para usar (o e-mail usado na hora de criar a conta pode ser ficticio).

-  Na hora de entrar você deverá "fazer uma assinatura", em um plano fictício, pois a ideia é utilizar a plataforma mediante ao pagamento de mensalidades. Utilize esse número de cartão `4242 4242 4242 4242`, esse é o número do cartão de teste, com ele você não será cobrado de nada (não se preocupe rsrs), o resto das informações podem ser fictícias. Depois clique em *Assinar*.

- Depois digite o nome da clinica e comece a usar!

-  Navegue usando o menu lateral, crie médicos e pacientes, agende consultas e você verá os cards e o gráfico na tela *Dashboard* alterado.
 
 

## 🏠 Executando localmente
Caso queira clonar o repositório e rodar ele localmente, siga esses passos:

 1. Abra o terminal, clone o repositório do github e entre na pasta do projeto:
	 - `git clone https://github.com/Adadezer/SaaS-Clinicas.git` ou `git clone git@github.com:Adadezer/SaaS-Clinicas.git`
	 - `cd SaaS-Clinicas` e `cd doutor-agenda `
	 
 2. Instale as dependências do projeto:
	 - `npm install`

 3.  Para usar a aplicação é necessário fornecer os dados dos serviços que ela utiliza como:
	 - **BetterAuth (Google OAuth)** → precisa de credenciais de OAuth (Client ID / Secret) no console da Google Cloud
	 - **Stripe** → precisa de uma conta Stripe para gerar a **API Key**.
	 - **Banco de dados (Postgres/Drizzle)** → chave de acesso a banco de dados como Neon, Supabase, Railway ou local Postgres.
 
 4. Configure as variáveis de ambiente:
	-  Crie um arquivo `.env` na raiz do projeto e coloque as chaves de acesso dos serviços usados.
	
	- Na pasta existe um arquivo chamado `.env.example` com um exemplo de como deve ser preenchido.

6. Execute o projeto:
	- `npm run dev`

7. No terminal aparecerá a url: `http://localhost:3000`, clique nela ou digite a url no navegador e espere a página carregar.

## 📌 Considerações

- O projeto está constantemente recebendo utualizações, caso perceba pequenas ações incompletas é normal, elas estão sendo implementadas aos poucos para mostrar que é possivel realizar tal ação conforme a plataforma vai sendo expandida, a aplicação sempre estará funcionando com seus requisitos mínimos e totalmente navegavel.

- O projeto usa uma chave de testes no Stripe que tem um limite de tempo onde ela fica online, caso tenha problemas para logar, ou utilizar a plataforma, me mande uma mensagem no [linkedin](https://www.linkedin.com/in/adadezer-iwazaki/), ou no email `adadezer@gmail.com` e terei o maior prazer em te ajudar.

## 🔗 Links
<span >
  <a href="mailto: adadezer@gmail.com"> <img width="110em" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>

  <a href="https://www.linkedin.com/in/adadezer-iwazaki/" target="_blank"><img width="110em" src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"></a>
</span>
