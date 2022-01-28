type domainKey =
    'allrecipes.com' |
    'bonappetit.com' |
    'epicurious.com' |
    'loveandlemons.com';

type domainInformationSelector = {
    // FIXME
    // [key in domainKey]: string;
    [key: string]: string
};

export const domainToTitleSelector: domainInformationSelector = {
    'allrecipes.com' : 'div[class="headline-wrapper"] > h1',
    'bonappetit.com' : 'h1[data-testid="ContentHeaderHed"]',
    'cooking.nytimes.com' : 'h1[class="recipe-title title name"]',
    'epicurious.com' : 'h1[data-testid="ContentHeaderHed"]',
    'ice.edu' : 'h1',
    'loveandlemons.com' : 'h1[class="entry-title"] > a',
    'simplyrecipes.com' : 'h1[class="heading__title"]',
    'tasty.co' : 'h1[class="recipe-name extra-bold xs-mb05 md-mb1"]',
}

export const domainToIngredientsListSelector: domainInformationSelector = {
    'allrecipes.com' : 'section[data-tracking-zone="recipe-ingredients"] > fieldset > ul > li',
    'bonappetit.com' : 'div[data-testid="IngredientList"] > div > div',
    'cooking.nytimes.com' : 'ul[class="recipe-ingredients"] > li',
    'epicurious.com' : 'div[data-testid="IngredientList"] > div > div',
    'ice.edu' : 'ul > li',
    'loveandlemons.com' : 'ul[class="wprm-recipe-ingredients"] > li',
    'simplyrecipes.com' : 'div[class="comp structured-ingredients"] > ul > li',
    'tasty.co' : 'div[class="ingredients-prep clearfix col"] > div > div > ul > li',
}

export const domainToIngredientAmountListSelector: domainInformationSelector = {
    'bonappetit.com' : 'div[data-testid="IngredientList"] > div > p'
}

export const domainToDirectionsListSelector: domainInformationSelector = {
    'allrecipes.com' : 'ul[class="instructions-section"] > li',
    'bonappetit.com' : 'div[data-testid="InstructionsWrapper"] > div > div',
    'cooking.nytimes.com' : 'ol[class="recipe-steps"] > li',
    'epicurious.com' : 'div[data-testid="InstructionsWrapper"] > div > div',
    'ice.edu' : 'ol > li',
    'loveandlemons.com' : 'ul[class="wprm-recipe-instructions"] > li',
    'simplyrecipes.com' : 'section[class="comp section--instructions section"] > div > div > ol > li > p',
    'tasty.co' : 'div[class="ingredients-prep clearfix col"] > div > ol > li',
}

// Wishlist:
// NYTimesCooking has ingredients per item, it'd be cool to group ingredients: https://cooking.nytimes.com/recipes/1018626-eggs-benedict
// Tasty.co has two copies of the HTML ingredients ?? No idea why, but it needs to be trimmed on processing.
// scripting overlap https://www.bonappetit.com/recipe/bas-best-chicken-parm
// not specific enough https://www.ice.edu/blog/chocolate-chip-cookie-recipe-smoke-butter