export const supportedDomains = [
    'allrecipes.com',
    'bonappetit.com',
    'cookingclassy.com',
    'cooking.nytimes.com',
    'delish.com',
    'epicurious.com',
    'loveandlemons.com',
    'ice.edu',
    'onceuponachef.com',
    'simplyrecipes.com',
    'tasty.co'
] as const;

export const domainIsSupported = (domain: string): boolean => {
    return supportedDomains.find((d) => d === domain) !== undefined
}

type domainInformationSelector = { [key in typeof supportedDomains[number]]?: string };

export const domainToTitleSelector: domainInformationSelector = {
    'allrecipes.com' : 'div[class="headline-wrapper"] > h1',
    'bonappetit.com' : 'h1[data-testid="ContentHeaderHed"]',
    'cookingclassy.com' : 'h1[class="title"]',
    'cooking.nytimes.com' : 'h1[class="recipe-title title name"]',
    'delish.com' : 'h1[class="content-hed recipe-hed"]',
    'epicurious.com' : 'h1[data-testid="ContentHeaderHed"]',
    'ice.edu' : 'h1',
    'loveandlemons.com' : 'h1[class="entry-title"] > a',
    'onceuponachef.com' : 'h1[class="title"]',
    'simplyrecipes.com' : 'h1[class="heading__title"]',
    'tasty.co' : 'h1[class="recipe-name extra-bold xs-mb05 md-mb1"]',
}

export const domainToIngredientsListSelector: domainInformationSelector = {
    'allrecipes.com' : 'section[data-tracking-zone="recipe-ingredients"] > fieldset > ul > li',
    'bonappetit.com' : 'div[data-testid="IngredientList"] > div > div',
    'cookingclassy.com' : 'ul[class="wprm-recipe-ingredients"] > li',
    'cooking.nytimes.com' : 'ul[class="recipe-ingredients"] > li',
    'delish.com' : 'div[class="ingredient-lists"] > div[class="ingredient-item"] > span[class="ingredient-description"] > p',
    'epicurious.com' : 'div[data-testid="IngredientList"] > div > div',
    'ice.edu' : 'ul > li',
    'loveandlemons.com' : 'ul[class="wprm-recipe-ingredients"] > li',
    'onceuponachef.com' : 'div[class="ingredients"] > ul > li > span[class="name"]',
    'simplyrecipes.com' : 'div[class="comp structured-ingredients"] > ul > li',
    'tasty.co' : 'div[class="ingredients-prep clearfix col"] > div > div > ul > li',
}

export const domainToIngredientAmountListSelector: domainInformationSelector = {
    'bonappetit.com' : 'div[data-testid="IngredientList"] > div > p',
    'delish.com' : 'div[class="ingredient-lists"] > div[class="ingredient-item"] > span[class="ingredient-amount"]',
    'onceuponachef.com' : 'div[class="ingredients"] > ul > li > span[class="amount"]',
}

export const domainToDirectionsListSelector: domainInformationSelector = {
    'allrecipes.com' : 'ul[class="instructions-section"] > li',
    'bonappetit.com' : 'div[data-testid="InstructionsWrapper"] > div > div',
    'cookingclassy.com' : 'ul[class="wprm-recipe-instructions"] > li',
    'cooking.nytimes.com' : 'ol[class="recipe-steps"] > li',
    'delish.com' : 'div[class="direction-lists"] > ol > li',
    'epicurious.com' : 'div[data-testid="InstructionsWrapper"] > div > div',
    'ice.edu' : 'ol > li',
    'loveandlemons.com' : 'ul[class="wprm-recipe-instructions"] > li',
    'onceuponachef.com' : 'div[class="instructions"] > ol > li',
    'simplyrecipes.com' : 'section[class="comp section--instructions section"] > div > div > ol > li > p',
    'tasty.co' : 'div[class="ingredients-prep clearfix col"] > div > ol > li',
}

// Wishlist:
// NYTimesCooking has ingredients per item, it'd be cool to group ingredients: https://cooking.nytimes.com/recipes/1018626-eggs-benedict
//                                                                             https://www.cookingclassy.com/chicken-curry/
// Tasty.co has two copies of the HTML ingredients ?? No idea why, but it needs to be trimmed on processing.
// scripting overlap https://www.bonappetit.com/recipe/bas-best-chicken-parm
// not specific enough https://www.ice.edu/blog/chocolate-chip-cookie-recipe-smoke-butter
// https://www.bonappetit.com/recipe/bas-best-chicken-parm -- ingredients are botched