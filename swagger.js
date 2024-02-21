
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
require('dotenv').config();

const doc = {
    info: {
        title: 'desafio-ia-labs-backend',
        description: 'API do ChatGPT para gerar conceitos inovadores de startups com base nos inputs dos usuários.',
        version: '1.0.0',
        contact: {
            name: "Emerson Santos",
            email: "emerson.sanatosokl10@gmail.com",
            url: "https://github.com/emersonSantos98/api_labs_backend.git"
        }
    },
    servers: [
        {
            url: `${process.env.API_URL}:${process.env.PORT}/api/v1`,
            description: 'Servidor local',
        },
    ],
    components: {
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/router/endpoints.js'];



swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/server');
});

console.log('endpointsFiles', endpointsFiles);
