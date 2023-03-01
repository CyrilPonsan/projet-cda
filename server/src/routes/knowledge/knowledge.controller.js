const { Configuration, OpenAIApi } = require("openai");

async function httpGetSolutions(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const { type, marque, modele, def } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 3600,
    prompt: `${type} ${marque} ${modele} ${def} top 10 solutions.`,
  });

  const parsed = response.data.choices[0]?.text.split("\n");

  console.log("PARSED:", parsed);

  res.status(200).json(parsed);
}

module.exports = { httpGetSolutions };
