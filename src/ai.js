import Anthropic from '@anthropic-ai/sdk';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const SYSTEM_PROMPT_FOR_CHEF = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;
const SYSTEM_PROMPT_FOR_SOMMELIER = `
You are a helper that gets the name of a dish that the user has, and suggests a drink (or several drink options) that would go well with that dish. If you don't know the name of the dish, you can guess what it is and suggest a drink to go with it. Format your answer in markdown format to make it easier to display on a web page`;

const anthropic = new Anthropic({
  // apiKey: API_KEY,
  apiKey:
    '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',
  dangerouslyAllowBrowser: true,
});

export async function getRecipeFromChefClaude(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(', ');

  // claude-3-5-haiku-20241022 - cost 3 times more but more newes version
  const msg = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    system: SYSTEM_PROMPT_FOR_CHEF,
    messages: [
      {
        role: 'user',
        content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
      },
    ],
  });
  return msg.content[0].text;
}

export async function getDrinkToDish(dish) {
  const msg = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    system: SYSTEM_PROMPT_FOR_SOMMELIER,
    messages: [
      {
        role: 'user',
        content: `I have ${dish}. Please advise me on a drink that will go well with it.`,
      },
    ],
  });
  return msg.content[0].text;
}
