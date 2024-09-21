## Como rodar a aplicação

### Backend
Para rodar o backend, digite os seguintes comandos em um terminal na pasta raiz do projeto, na ordem especificada:

<ol>
  <li>cd backend/ && cp sample.env .env</li>
  <li>cd development && docker-compose up</li>
</ol>

### Frontend

  Para rodar o frontend abra um novo terminal na pasta raiz do projeto, e execute os comandos abaixo na ordem especificada:

<ol>
  <li>cd frontend/ && cp sample.env .env</li>
  <li>cd development && docker-compose up</li>
</ol>

É possível acessar o frontend através da url http://localhost:3000

### Observações

O backend rodará na porta 3001, sendo possível testá-lo através dos CURLs abaixo:

- Rota para criar as transações:
 <br> 
 Obs: Lembre-se de substituir o conteúdo do file pelo caminho onde se encontra o arquivo.

```
curl --request POST \
  --url http://localhost:3001/transaction/v1/transaction \
  --header 'Content-Type: multipart/form-data' \
  --form 'file=${endereço do arquivo txt}'
```

- Rota para recuperar as transações:
<br> 
Obs: O curl apresenta os exemplos de filtros que podem ser utilizados

```
 curl --request GET \
  --url 'http://localhost:3001/transaction/v1/transaction?cpfCnpj=92430999900&name=Chelsea%20Blick&transactionId=29073cc8-b7ca-4486-b8a7-b4e9bf48fc32&startDate=2024-01-22&endDate=2024-07-30&pageSize=10&page=1' \
```
<br>
 <hr>
<br>

<p  align="center"  width="100%">

  

<img  width="128px"  src="images/favicon.ico"  alt="Zeztra">

  

</p>

  

  

## Desafio FullStack Zeztra

  

  

**Façam a leitura deste documento com muita atenção do começo ao fim.**

  

  

O intuito deste teste é avaliar seus conhecimento técnicos com a stack MERN (Mongo, Express, React, Nodejs), fazendo uso do NextJS e Typescript (tanto no front-end quanto no back-end).

  

  

O teste consiste em ler <a  href="https://github.com/Zeztra/desafio_vaga/blob/main/transacoes.txt">este arquivo de texto</a>, salvar os clientes e atrelar as transações a eles, além de apresentar esses dados em tela no ReactJS.

  

  

O teste pode ser realizado em quanto tempo quiser, porém, gostariamos que realizasse em não mais que algumas poucas horas.

  

  

## Instruções para o desafio

  

  

1. Faça um fork deste projeto para a sua conta no Github (crie uma caso não tenha);

  

2. Em seguida, impletemente os projetos tal qual descrito abaixo, em seu clone local;

  

3. Use a pasta frontend para o portal, e backend para a API;

  

4. Para a entrega do teste, envie um email com o link do Github para **vitor.ricardo@zeztra.com**.

  

  

## Descrição do Teste

  

  

Uma empresa recebe diariamente um arquivo TXT com várias conciliações de pagamentos de seus clientes.

  

  

Seu objetivo é criar um projeto usando NextJS com Typescript, fazer upload do arquivo TXT enviar para a API em NodeJS/Typescript, armazenar no MongoDB e as suas transações.


#### O portal Web deve conter as seguintes funcionalidades:

  

Tela de dashboard, com:

- [ ] botão com upload do arquivo TXT;

- [ ] tabela com a listagem de transações paginada, ordenada pela data da transação;
- [ ] Filtros de busca para listagem, com por exemplo: por nome e/ou range de data da transação;

  

  

Fique a vontade para usar alguma lib que auxilie no layout.

  

  

#### A API deve ter os seguintes endpoints, seguindo suas respectitivas regras de negócio:

  

  

1. Endpoint para receber o arquivo txt das transações, e para cada linha do TXT:

  

- [ ] Cadastrar o cliente no banco de dados, caso não exista;

  

- [ ] Cadastrar a transação relacionada ao cliente;

   

- [ ] Não deixar duplicar a transação, caso ela já exista na base;
- [ ] Calcule o tempo da execução da leitura completa do arquivo.

  

2. Endpoint de listagem de transação;

  

- [ ] Preferencialmente, faça a paginação para o frontend direto na consulta;
- [ ] Aplique os filtros de buscas;
  

#### Avaliação

  

Seu projeto será avaliado de acordo com os seguintes critérios:

  

  

1. Sua aplicação atende os requisitos básicos?

  

2. Você documentou no README o que deve ser feito para ela rodar?

  

3. Como foi arquitetou ambos os projetos.

  

4. Seu conhecimento geral sobre a stack MERN.

  

  

Boa sorte!