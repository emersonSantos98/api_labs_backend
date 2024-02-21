require('dotenv').config();

const server = require("./app").server


server.get(['/', '/api/v1'], function (req, res) {
    res.redirect('/api/v1/api-docs');
});




server.listen(process.env.PORT || 3030, (err) => {
    if (err) console.log("Erro na configuração do servidor")
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
        console.log(`server rodando em ambiente de desenvolvimento em ${process.env.API_URL}:${process.env.PORT}/api/v1`);
    } else {
        console.log(`App rodando em ambiente de produção em ${process.env.URL}/api/v1`);
    }

});
