<p  align="center"  width="100%">
<img  width="128px"  src="images/favicon.ico"  alt="Zeztra">
</p>

## Desafio FullStack Zeztra

**Façam a leitura deste documento com muita atenção do começo ao fim.** 

O intuito deste teste é avaliar seus conhecimento técnicos com a stack MERN (Mongo, Express, React, Nodejs), fazendo uso do NextJS e Typescript (tanto no front-end quanto no back-end).

O teste consiste em ler <a href="https://github.com/Zeztra/desafio_vaga/blob/main/transacoes.txt">este arquivo de texto</a>, salvar os clientes e atrelar as transações a eles, além de apresentar esses dados em tela no ReactJS.

O teste pode ser realizado em quanto tempo quiser, porém, gostariamos que realizasse em não mais que algumas poucas horas.

## Instruções para o desafio

 1. Faça um fork deste projeto para a sua conta no Github (crie uma caso não tenha);
 2. Em seguida, impletemente os projetos tal qual descrito abaixo, em seu clone local;
 3. Use a pasta frontend para o portal, e backend para a API;
 4. Para a entrega do teste, envie um email para **vitor.ricardo@zeztra.com**.

## Descrição do Teste

Uma empresa recebe diariamente um arquivo TXT com várias conciliações de pagamentos de seus clientes, e a cada transação é gerado um recebimento do pagamento.

Seu objetivo é criar um projeto usando NextJS com Typescript, fazer upload do arquivo TXT enviar para a API em NodeJS/Typescript, armazenar no MongoDB e listar os clientes com suas transações.

#### O portal Web deve conter as seguintes funcionalidades:

 1. Um dashboard com botão de upload para o arquivo TXT;
 2. No dashboard, deve ter uma tabela com a listagem de transações paginada, ordenada pela data da transação e:
	 - [ ] um botão de ação que leve até a tela de cliente;
	 - [ ] um botão de ação para download do recibo;
 3. Na tela de cliente, deve ter os dados do mesmo juntamente com uma tabela paginada das transações, ordenada pela data de transações e:
	 - [ ] um botão de ação para download do recibo;
 4. Fique a vontade para usar alguma lib que auxilie no layout.

#### A API deve funcionar ter os seguintes endpoints seguindo suas respectitivas regras de negócio:

 1. Endpoint para receber o arquivo txt das transações, e para cada linha do TXT:
	 - [ ] Cadastrar o cliente no banco de dados, caso não exista;
	 - [ ] Cadastrar a transação relacionada ao cliente;
	 - [ ] Gerar um arquivo TXT da transação com os dados do pagamento;
	 - [ ] Não deixar duplicar a transação, caso ela já exista na base.
 2. Endpoint de listagem de transação;
	 - [ ] Preferencialmente, faça a paginação direto na consulta;
 3. Endpoint de cliente com suas transações;
	 - [ ] Preferencialmente, faça a paginação direto na consulta;
	 
#### Avaliação
Seu projeto será avaliado de acordo com os seguintes critérios:

 1. Sua aplicação atende os requisitos básicos?
 2. Você documentou no README o que deve ser feito para ela rodar?
 3. Seu conhecimento geral sobre a stack MERN.

Boa sorte!
