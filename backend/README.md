## Como rodar a aplicação

### Backend
Para rodar o backend, digite os seguintes comandos em um terminal na pasta raiz do projeto, na ordem especificada:

<ol>
  <li>cd backend/ && cp sample.env .env</li>
  <li>cd development && docker-compose up</li>
</ol>

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