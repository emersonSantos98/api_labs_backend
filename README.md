# Desafio IA Labs - API de Geração de Ideias de Startups com ChatGPT

Este projeto consiste em uma API que utiliza a API do ChatGPT para gerar conceitos inovadores de startups com base nos inputs dos usuários.


#  Instalação

Para começar, clone o repositório do projeto:
git clone https://github.com/emersonSantos98/api_labs_backend.git


Em seguida, instale as dependências do projeto:

    npm install


## Configuração

Antes de executar a aplicação, você precisará configurar algumas 			      variáveis de  ambiente. Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis necessárias:

     OPENAI_API_KEY=<Sua chave da API do OpenAI>
     OPENAI_API_ORGANIZATION=<Seu id da organização da API do OpenAI>

## Documentação Swagger

Para visualizar a documentação Swagger da API e criação do arquivo **swagger-output.json**, execute o seguinte comando: `npm run swagger`

Isso iniciará o servidor Swagger na porta especificada no arquivo `.env`. Em seguida, acesse `http://localhost:<PORT>/api-docs` no seu navegador para visualizar a documentação interativa da API.

##  Uso

Para iniciar o servidor com Nodemon, execute o seguinte comando:  `npm start`     ou   `npm run swagger`   Para iniciar o servidor com swagger.


Isso iniciará o servidor Express na porta especificada no arquivo `.env`.

## Endpoints

A API possui os seguintes endpoints:  `/api/startup`
**Método:** POST
**Descrição:** Gera uma ideia de startup com base no input do usuário.
**Corpo da Requisição:**

     {
        messages: "Descrição ou palavras-chave relacionadas à ideia da startup.",
        modeloNegocio: "palavras-chave exemplo startup tecnologia "
      }

## **Exemplo de Requisição:**

    var axios = require("axios").default;
    
    var options = {
      method: 'POST',
      url: 'http://localhost:3030/api/v1/startups',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        messages: 'me de 5 modelos de startups de tecnologia',
        modeloNegocio: 'startups tecnologia'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

# **Exemplo de Resposta:**

    {
      "idea": "Uma plataforma de entrega de alimentos orgânicos que      
      utiliza inteligência artificial para conectar produtores locais 
      com consumidores conscientes."
    }


## Licença

Este projeto está licenciado sob a [Licença MIT](https://chat.openai.com/c/LICENSE).
