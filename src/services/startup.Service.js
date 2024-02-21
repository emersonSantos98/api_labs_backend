const  { AppError } = require('../utils/errorHandler');
const OpenaiService = require('./openai.Service');

class StartupService {
    constructor() {
        this.openaiService = new OpenaiService();
        this.createStartupWithContext = this.createStartupWithContext.bind(this);
        this.conversationHistory = {};
    }

    async createStartupWithContext(messages, modeloNegocio) {
        const userId = 'test-user-id-1';
        const { conversationHistory } = this;
        try {
            if (!this.isStartupContext(messages)) {
                throw new AppError('Para gerar ideias de startups, forneça informações relevantes sobre startups ou empreendedorismo.', 400);
            }

            const userHistory = conversationHistory[userId] || [];

            userHistory.push(messages);
            conversationHistory[userId] = userHistory;

            const context = userHistory.join('\n');

            const input = `Gere ideias de startups inovadoras com base nos seguintes inputs dos usuários:\n\n${messages}\n\nModelo de Negócio: ${modeloNegocio}`;

            const openai = await this.openaiService.main(input, context);
            console.log('openai', openai)
            if (openai) {
                const startups = await this.parseStartupResponse(openai);
                return {
                    idea: startups,
                }
            }

            return null

        } catch (error) {
            console.log('StartupService', error);
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Ocorreu um erro interno. Por favor, tente novamente mais tarde.', 500);
            }
        }
    }

    parseStartupResponse = async (response) => {
        const startups = [];


        if (typeof response === 'string' && response.includes('**')) {

            const examples = response.split('\n\n').map(example => example.trim());


            examples.forEach((example, index) => {

                const [name, description] = example.split(':');

                const bgColor = `bg-${this.randomColor()}-600`;


                const startup = {
                    name: name.trim(),
                    initials: name.trim().substring(0, 4).toUpperCase(),
                    href: '#',
                    text: description.trim(),
                    bgColor,
                    members: Math.floor(Math.random() * 20) + 1
                };

                startups.push(startup);
            });
        }
        console.log('startups', startups)
        return startups;
    }


    isStartupContext(input) {
        const startupKeywords = ['startup', 'startups', 'empreendedor', 'empreender', 'empreendedorismo', 'inovação', 'negócio', 'tecnologia', 'empresa', 'incubadora', 'investimento', 'crescimento', 'escalabilidade', 'MVP', 'disruptivo', 'mercado', 'pitch', 'capital de risco', 'solução', 'sucesso'];


        const lowercaseInput = input.toLowerCase();

        for (const keyword of startupKeywords) {
            const regex = new RegExp('\\b' + keyword + '\\b', 'i');
            if (regex.test(lowercaseInput)) {
                return true;
            }
        }

        return false;
    }

     randomColor = () => {
        const colors = ['pink', 'purple', 'indigo', 'blue', 'green', 'yellow', 'red', 'teal', 'cyan', 'gray'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

module.exports = StartupService;
