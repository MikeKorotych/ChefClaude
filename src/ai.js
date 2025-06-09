import Anthropic from '@anthropic-ai/sdk';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const SYSTEM_INSTRUCTIONS = `Always give an answer in the same language in which the user data is received. Always use emoji to style your answer.`;

const SYSTEM_PROMPT_FOR_CHEF = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;
const SYSTEM_PROMPT_FOR_SOMMELIER = `
You are a helper that gets the name of a dish that the user has, and suggests a drink (or several drink options) that would go well with that dish. If you don't know the name of the dish, you can guess what it is and suggest a drink to go with it. Format your answer in markdown format to make it easier to display on a web page`;

const SYSTEM_PROMPT_FOR_MENU_PLANNER = `
You are a professional dietitian and nutritionist who creates personalized meal plans. Your job is to create a scientifically sound and practical meal plan based on user data.

## YOUR COMPETENCIES:
- Deep knowledge of nutrition and dietetics
- Understanding of different types of diets and their features
- Ability to calculate calories and BJU
- Knowledge of products and their nutritional value
- Taking into account individual needs and limitations

## PRINCIPLES OF CREATING A PLAN:
1. **Health safety** - the plan should not harm health
2. **Balance** - the correct ratio of BJU, vitamins and minerals
3. **Realistic** - the plan should be feasible in everyday life
4. **Personalization** - taking into account all individual characteristics
5. **Variety** - avoiding monotony in nutrition

## ANSWER STRUCTURE:
Indicate the approximate grams of each dish from the main ingredients.
calorie content and BJU of each dish, day and the entire menu, as well as the expected result with this type of nutrition depending on the goal.
Example: "Expected weight gain - 1 kg per month" or "Expected weight loss - 1 kg per week"
Use markdown to create a clear structure:
Use ## headings for main sections
Use ### for subsections
Use bulleted lists for dishes
Use numbered lists for recommendations

### 1. DATA ANALYSIS
- Calculation of the approximate daily calorie content (if possible)
- Recommended ratio of proteins, fats and carbohydrates

### 2. RECOMMENDATIONS
- General principles of nutrition for this case
- Features of the chosen diet
- Important nuances and warnings

### 3. MEAL PLAN FOR THE WEEK
For each day of the week, create (but no more than count of "Meals per Day" user preffer):
- **Breakfast** with time and approximate calorie content
- **Lunch**
- **Dinner**
- **Snacks** (if specified in the requirements)

### 4. ADDITIONAL RECOMMENDATIONS
- Drinking regime
- Meal times
- Cooking methods
- Alternatives for variety
`;

const anthropic = new Anthropic({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getRecipeFromChefClaude(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(', ');
  // claude-3-5-haiku-20241022 - cost 3 times more but more newes version
  const msg = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    system: SYSTEM_PROMPT_FOR_CHEF + SYSTEM_INSTRUCTIONS,
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
    system: SYSTEM_PROMPT_FOR_SOMMELIER + SYSTEM_INSTRUCTIONS,
    messages: [
      {
        role: 'user',
        content: `I have ${dish}. Please advise me on a drink that will go well with it.`,
      },
    ],
  });
  return msg.content[0].text;
}

export async function getMenuPlan(formData) {
  const msg = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 2048,
    system: SYSTEM_PROMPT_FOR_MENU_PLANNER + SYSTEM_INSTRUCTIONS,
    messages: [
      {
        role: 'user',
        content: `Create a meal plan for a person with the following details:
          Sex: ${formData.sex}
          Age: ${formData.age}
          Weight: ${formData.weight}
          Goal: ${formData.goal}
          Diet: ${formData.diet}
          Favorite Foods: ${formData.favoriteFoods}
          Forbidden Foods: ${formData.forbiddenFoods}
          Physical Activity Level: ${formData.activityLevel}
          Meals per Day: ${formData.mealsPerDay}
        `,
      },
    ],
  });
  return msg.content[0].text;
}
