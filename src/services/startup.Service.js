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

            return {
                idea: openai,
            }

        } catch (error) {
            console.log('StartupService', error);
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError('Ocorreu um erro interno. Por favor, tente novamente mais tarde.', 500);
            }
        }
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
}

module.exports = StartupService;
