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
    'loveandlemons.com' : 'h1[class="entry-title"] > a',
    'simplyrecipes.com' : 'h1[class="heading__title"]',
    'tasty.com' : 'h1[class="recipe-name extra-bold xs-mb05 md-mb1"]',
}

export const domainToIngredientsListSelector: domainInformationSelector = {
    'allrecipes.com' : 'section[data-tracking-zone="recipe-ingredients"] > fieldset > ul > li',
    'bonappetit.com' : 'div[data-testid="IngredientList"] > div > div',
    'cooking.nytimes.com' : 'ul[class="recipe-ingredients"] > li',
    'epicurious.com' : 'div[data-testid="IngredientList"] > div > div',
    'loveandlemons.com' : 'ul[class="wprm-recipe-ingredients"] > li',
    'simplyrecipes.com' : 'div[class="comp structured-ingredients"] > ul > li',
    'tasty.com' : 'div[class="ingredients__section xs-mt1 xs-mb3"] > ul > li',
}

export const domainToIngredientAmountListSelector: domainInformationSelector = {
    'bonappetit.com' : 'div[data-testid="IngredientList"] > div > p'
}

export const domainToDirectionsListSelector: domainInformationSelector = {
    'allrecipes.com' : 'ul[class="instructions-section"] > li',
    'bonappetit.com' : 'div[data-testid="InstructionsWrapper"] > div > div',
    'cooking.nytimes.com' : 'ol[class="recipe-steps"] > li',
    'epicurious.com' : 'div[data-testid="InstructionsWrapper"] > div > div',
    'loveandlemons.com' : 'ul[class="wprm-recipe-instructions"] > li',
    'simplyrecipes.com' : 'section[class="comp section--instructions section"] > div > div > ol > li > p',
    'tasty.com' : 'div[class="preparation col xs-flex-grow-1 md-col-8 xs-mx2 xs-mb2 xs-mt2 md-mt0"] > ol > li',
}

// Wishlist:
// NYTimesCooking has ingredients per item, it'd be cool to group ingredients: https://cooking.nytimes.com/recipes/1018626-eggs-benedict