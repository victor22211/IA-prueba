import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { messages } = req.body;

      if (!messages) {
        return res.status(400).json({ error: 'Messages are required' });
      }

      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      res.status(200).json({ response: completion.data.choices[0].message });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Error processing your request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
