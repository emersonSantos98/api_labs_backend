const OpenAI = require('openai');
const  { AppError } = require('../utils/errorHandler');
class OpenaiService {
    constructor() {
        console.log('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY)
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            organization: process.env.OPENAI_API_ORGANIZATION,
        });
            this.main = this.main.bind(this);
    }

    async main(messages, context) {
        const {openai} = this;
        try {
            const stream = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: context },
                    { role: "user", content: messages }
                ],
                stream: true,
            });


            let response = '';
            for await (const chunk of stream) {
                 response += chunk.choices[0]?.delta?.content || "";
            }

            return response;

        } catch (error) {
            console.log('openai', error)
            throw new AppError(error.message, 500);
        }
    }

}

module.exports = OpenaiService;
