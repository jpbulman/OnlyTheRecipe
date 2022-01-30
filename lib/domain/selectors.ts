export const supportedDomains = [
    'allrecipes.com',
    'bettycrocker.com',
    'bonappetit.com',
    'budgetbytes.com',
    'cookingclassy.com',
    'cooking.nytimes.com',
    'delish.com',
    'epicurious.com',
    'foodnetwork.com',
    'gimmesomeoven.com',
    'loveandlemons.com',
    'ice.edu',
    'inspiredtaste.net',
    'onceuponachef.com',
    'simplyrecipes.com',
    'tasteofhome.com',
    'tasty.co',
    'thepioneerwoman.com',
    'thestayathomechef.com',
] as const;

export const domainIsSupported = (domain: string): boolean => {
    return supportedDomains.find((d) => d === domain) !== undefined
}

type domainInformationSelector = { [key in typeof supportedDomains[number]]?: string };

export const domainToTitleSelector: domainInformationSelector = {
    'allrecipes.com' : 'div[class="headline-wrapper"] > h1',
    'bettycrocker.com' : 'h1[class="rdpTitle"]',
    'bonappetit.com' : 'h1[data-testid="ContentHeaderHed"]',
    'budgetbytes.com' : 'h1[class="title"]',
    'cookingclassy.com' : 'h1[class="title"]',
    'cooking.nytimes.com' : 'h1[class="recipe-title title name"]',
    'delish.com' : 'h1[class="content-hed recipe-hed"]',
    'epicurious.com' : 'h1[data-testid="ContentHeaderHed"]',
    'foodnetwork.com' : 'section[class="o-AssetTitle"] > h1 > span',
    'gimmesomeoven.com' : 'h1[class="posttitle"]',
    'ice.edu' : 'h1',
    'inspiredtaste.net' : 'div[class="itr-recipe-title"] > h2',
    'loveandlemons.com' : 'h1[class="entry-title"] > a',
    'onceuponachef.com' : 'h1[class="title"]',
    'simplyrecipes.com' : 'h1[class="heading__title"]',
    'tasteofhome.com' : 'h1[class="recipe-title"]',
    'tasty.co' : 'h1[class="recipe-name extra-bold xs-mb05 md-mb1"]',
    'thepioneerwoman.com' : 'h1[class="content-hed recipe-hed"]',
    'thestayathomechef.com' : 'header[class="article-header"] > h1'
}

export const domainToIngredientsListSelector: domainInformationSelector = {
    'allrecipes.com' : 'section[data-tracking-zone="recipe-ingredients"] > fieldset > ul > li',
    'bettycrocker.com' : 'div[class="rdpIngredients"] > ul > li',
    'bonappetit.com' : 'div[data-testid="IngredientList"] > div > div',
    'budgetbytes.com' : 'ul[class="wprm-recipe-ingredients"] > li',
    'cookingclassy.com' : 'ul[class="wprm-recipe-ingredients"] > li',
    'cooking.nytimes.com' : 'ul[class="recipe-ingredients"] > li',
    'delish.com' : 'div[class="ingredient-lists"] > div[class="ingredient-item"] > span[class="ingredient-description"] > p',
    'epicurious.com' : 'div[data-testid="IngredientList"] > div > div',
    'foodnetwork.com' : 'section[class="o-Ingredients"] > div > p',
    'gimmesomeoven.com' : 'div[class="tasty-recipes-ingredients-body"] > ul > li',
    'ice.edu' : 'ul > li',
    'inspiredtaste.net' : 'span[class="itr-ingredients"] > p',
    'loveandlemons.com' : 'ul[class="wprm-recipe-ingredients"] > li',
    'onceuponachef.com' : 'div[class="ingredients"] > ul > li > span[class="name"]',
    'simplyrecipes.com' : 'div[class="comp structured-ingredients"] > ul > li',
    'tasteofhome.com' : 'div[class="recipe-ingredients"] > ul > li',
    'tasty.co' : 'div[class="ingredients-prep clearfix col"] > div > div > ul > li',
    'thepioneerwoman.com' : 'div[class="ingredient-lists"] > div',
    'thestayathomechef.com' : 'ul[class="wprm-recipe-ingredients"] > li'
}

export const domainToIngredientAmountListSelector: domainInformationSelector = {
    'bonappetit.com' : 'div[data-testid="IngredientList"] > div > p',
    'delish.com' : 'div[class="ingredient-lists"] > div[class="ingredient-item"] > span[class="ingredient-amount"]',
    'onceuponachef.com' : 'div[class="ingredients"] > ul > li > span[class="amount"]',
}

export const domainToDirectionsListSelector: domainInformationSelector = {
    'allrecipes.com' : 'ul[class="instructions-section"] > li',
    'bettycrocker.com' : 'ul[class="recipeSteps"] > li',
    'bonappetit.com' : 'div[data-testid="InstructionsWrapper"] > div > div',
    'budgetbytes.com' : 'ul[class="wprm-recipe-instructions"] > li',
    'cookingclassy.com' : 'ul[class="wprm-recipe-instructions"] > li',
    'cooking.nytimes.com' : 'ol[class="recipe-steps"] > li',
    'delish.com' : 'div[class="direction-lists"] > ol > li',
    'epicurious.com' : 'div[data-testid="InstructionsWrapper"] > div > div',
    'foodnetwork.com' : 'section[data-module="recipe-method"] > div > ol > li',
    'gimmesomeoven.com' : 'div[class="tasty-recipes-instructions-body"] > ol > li',
    'ice.edu' : 'ol > li',
    'inspiredtaste.net' : 'span[class="itr-directions"] > p',
    'loveandlemons.com' : 'ul[class="wprm-recipe-instructions"] > li',
    'onceuponachef.com' : 'div[class="instructions"] > ol > li',
    'simplyrecipes.com' : 'section[class="comp section--instructions section"] > div > div > ol > li > p',
    'tasteofhome.com' : 'ol[class="recipe-directions__list"] > li',
    'tasty.co' : 'div[class="ingredients-prep clearfix col"] > div > ol > li',
    'thepioneerwoman.com' : 'div[class="direction-lists"] > ol > li',
    'thestayathomechef.com' : 'ul[class="wprm-recipe-instructions"] > li'
}

// Wishlist:
// NYTimesCooking has ingredients per item, it'd be cool to group ingredients: https://cooking.nytimes.com/recipes/1018626-eggs-benedict
//                                                                             https://www.cookingclassy.com/chicken-curry/
// Tasty.co has two copies of the HTML ingredients ?? No idea why, but it needs to be trimmed on processing.
// scripting overlap https://www.bonappetit.com/recipe/bas-best-chicken-parm
// not specific enough https://www.ice.edu/blog/chocolate-chip-cookie-recipe-smoke-butter
// https://www.bonappetit.com/recipe/bas-best-chicken-parm -- ingredients are botched
// Weird 'deselect all' https://www.foodnetwork.com/recipes/alton-brown/cocoa-brownies-recipe-2085484
// cafedelites.com
// 
// unify into one selector object with sub objects for each domain