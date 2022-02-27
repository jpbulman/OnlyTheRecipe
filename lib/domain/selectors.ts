export const supportedDomains = [
    'allrecipes.com',
    'bettycrocker.com',
    'blueberry.org',
    'bonappetit.com',
    'budgetbytes.com',
    'cookingclassy.com',
    'cooking.nytimes.com',
    'christinascucina.com',
    'delish.com',
    // 'eatwell101.com',
    'epicurious.com',
    'foodnetwork.com',
    'gimmesomeoven.com',
    'howtobbqright.com',
    'ice.edu',
    'inspiredtaste.net',
    'joyfoodsunshine.com',
    'justonecookbook.com',
    'kingarthurbaking.com',
    'kitchenstories.com',
    'kotikokki.net',
    'littlesweetbaker.com',
    'loveandlemons.com',
    'natashaskitchen.com',
    'onceuponachef.com',
    'pillsbury.com',
    'pinchofyum.com',
    'sallysbakingaddiction.com',
    'simplyrecipes.com',
    'spendwithpennies.com',
    'tasteofhome.com',
    'tasty.co',
    'thepioneerwoman.com',
    'thestayathomechef.com',
    'valio.fi',
    'whatsgabycooking.com',
    'yhteishyva.fi'
] as const;

export const domainIsSupported = (domain: string): boolean => {
    return supportedDomains.find((d) => d === domain) !== undefined
}

export const annoyingToParseDomains = [
    'bonappetit.com',
    'joyfoodsunshine.com',
    'cooking.nytimes.com',
    'tasty.co',
] as const;

export const domainIsAnnoyingToParse = (domain: string): boolean => {
    return annoyingToParseDomains.find((d) => d === domain) !== undefined
}

type recipeSelectorSet = {
    titleSelector: string,
    ingredientsSelector: string,
    ingredientsAmountSelector?: string,
    directionsSelector: string,
}

type domainInformationSelector = { [key in typeof supportedDomains[number]]?: recipeSelectorSet };

export const recipeSelectors: domainInformationSelector = {
    'allrecipes.com' : {
        titleSelector: 'div[class="headline-wrapper"] > h1',
        ingredientsSelector: 'section[data-tracking-zone="recipe-ingredients"] > fieldset > ul > li',
        directionsSelector: 'ul[class="instructions-section"] > li',
    },
    'bettycrocker.com' : {
        titleSelector: 'h1[class="rdpTitle"]',
        ingredientsSelector: 'div[class="rdpIngredients"] > ul > li',
        directionsSelector: 'ul[class="recipeSteps"] > li',
    },
    'blueberry.org' : {
        titleSelector: 'h1[itemprop="name"]',
        ingredientsSelector: 'div[class="ingredients"] > ul > li',
        directionsSelector: 'section[itemprop="recipeInstructions"] > div > ol > li',
    },
    'budgetbytes.com' : {
        titleSelector: 'h1[class="title"]',
        ingredientsSelector: 'ul[class="wprm-recipe-ingredients"] > li',
        directionsSelector: 'ul[class="wprm-recipe-instructions"] > li',
    },
    'cookingclassy.com' : {
        titleSelector: 'h1[class="title"]',
        ingredientsSelector: 'ul[class="wprm-recipe-ingredients"] > li',
        directionsSelector: 'ul[class="wprm-recipe-instructions"] > li',
    },
    'christinascucina.com' : {
        titleSelector: 'h2.mv-create-title',
        ingredientsSelector: 'div.mv-create-ingredients > ul > li',
        directionsSelector: 'div.mv-create-instructions li, div.mv-create-instructions *:header:not(*[class~="mv-create-instructions-title"])'
    },
    'delish.com' : {
        titleSelector: 'h1[class="content-hed recipe-hed"]',
        ingredientsSelector: 'div[class="ingredient-lists"] > div[class="ingredient-item"] > span[class="ingredient-description"] > p',
        ingredientsAmountSelector: 'div[class="ingredient-lists"] > div[class="ingredient-item"] > span[class="ingredient-amount"]',
        directionsSelector: 'div[class="direction-lists"] > ol > li',
    },
    // 'eatwell101.com' : {
    //     titleSelector: 'h1[class="entry-title black bold"]',
    //     ingredientsSelector: 'div[id="rco"] > ul > li',
    //     directionsSelector: 'div[class="dr"] > p',
    // },
    'epicurious.com' : {
        titleSelector: 'h1[data-testid="ContentHeaderHed"]',
        ingredientsSelector: 'div[data-testid="IngredientList"] > div > div',
        directionsSelector: 'div[data-testid="InstructionsWrapper"] > div > div',
    },
    'foodnetwork.com' : {
        titleSelector: 'section[class="o-AssetTitle"] > h1 > span',
        ingredientsSelector: 'section[class="o-Ingredients"] > div > p',
        directionsSelector: 'section[data-module="recipe-method"] > div > ol > li',
    },
    'gimmesomeoven.com' : {
        titleSelector: 'h1[class="posttitle"]',
        ingredientsSelector: 'div[class="tasty-recipes-ingredients-body"] > ul > li',
        directionsSelector: 'div[class="tasty-recipes-instructions-body"] > ol > li',
    },
    'howtobbqright.com' : {
        titleSelector: 'h1',
        ingredientsSelector: 'div.tasty-recipes-ingredients > div > ul > li',
        directionsSelector: 'div.tasty-recipes-instructions > div > ol > li'
    },
    'ice.edu' : {
        titleSelector: 'h1',
        ingredientsSelector: 'section[class="wysiwyg"] > ul > li',
        directionsSelector: 'ol > li',
    },
    'inspiredtaste.net' : {
        titleSelector: 'div[class="itr-recipe-title"] > h2',
        ingredientsSelector: 'span[class="itr-ingredients"] > p',
        directionsSelector: 'span[class="itr-directions"] > p',
    },
    'justonecookbook.com' : {
        titleSelector: 'h1[class="entry-title"]',
        ingredientsSelector: 'ul[class="wprm-recipe-ingredients"] > li',
        directionsSelector: 'div[class="wprm-recipe-instruction-text"]',
    },
    'kingarthurbaking.com' :{
        titleSelector: 'title',
        ingredientsSelector: 'div[class="ingredient-section"] > ul > li',
        directionsSelector: 'article[class="recipe__instructions"] > div > ol > li > p'
    },
    'kitchenstories.com' : {
        titleSelector: 'h1[class~=recipe-title]',
        ingredientsSelector: 'table.ingredients > tbody > tr > td:nth-child(2)',
        ingredientsAmountSelector: 'table.ingredients > tbody > tr > td:nth-child(1)',
        directionsSelector: 'li[class~="step"] > p[class="text"]'
    },
    'kotikokki.net' : {
        titleSelector: 'h1[id="recipe-title"]',
        ingredientsSelector: 'tr.ingredient > td.name',
        ingredientsAmountSelector: 'tr.ingredient > td.amount-unit',
        directionsSelector: 'div.instructions > span > p'
    },
    'littlesweetbaker.com' : {
        titleSelector: 'h2[class="tasty-recipes-title"]',
        ingredientsSelector: 'div[class="tasty-recipes-ingredients"] > div > ul > li',
        directionsSelector: 'div[class="tasty-recipes-instructions"] > div > ol > li',
    },
    'loveandlemons.com' : {
        titleSelector: 'h1[class="entry-title"] > a',
        ingredientsSelector: 'ul[class="wprm-recipe-ingredients"] > li',
        directionsSelector: 'ul[class="wprm-recipe-instructions"] > li',
    },
    'natashaskitchen.com' : {
        titleSelector: 'h2[class="wprm-recipe-name"]',
        ingredientsSelector: 'div[class="wprm-recipe-ingredient-group"] > ul > li',
        directionsSelector: 'div[class="wprm-recipe-instruction-group"] > ol > li',
    },
    'onceuponachef.com' : {
        titleSelector: 'h1[class="title"]',
        ingredientsSelector: 'div[class="ingredients"] > ul > li > span[class="name"]',
        ingredientsAmountSelector: 'div[class="ingredients"] > ul > li > span[class="amount"]',
        directionsSelector: 'div[class="instructions"] > ol > li',
    },
    'pillsbury.com' : {
        titleSelector: 'h1[class="rdpTitle"]',
        ingredientsSelector : 'div[class="rdpIngredients"] > ul > li',
        directionsSelector: 'ul[class="recipeSteps"] > li'
    },
    'pinchofyum.com' : {
        titleSelector: 'h2[class="tasty-recipes-title"]',
        ingredientsSelector: 'div[class="tasty-recipes-ingredients"] > div > ul > li',
        directionsSelector: 'div[class="tasty-recipes-instructions"] > div > ol > li'
    },
    'sallysbakingaddiction.com' : {
        titleSelector: 'h2[class="tasty-recipes-title"]',
        ingredientsSelector: 'div[class="tasty-recipes-ingredients-body"] > ul > li',
        directionsSelector: 'div[class="tasty-recipes-instructions-body"] > ol > li'
    },
    'simplyrecipes.com' : {
        titleSelector: 'h1[class="heading__title"]',
        ingredientsSelector: 'div[class="comp structured-ingredients"] > ul > li',
        directionsSelector: 'section[class="comp section--instructions section"] > div > div > ol > li > p',
    },
    'spendwithpennies.com' : {
        titleSelector: 'h1[class="entry-title"]',
        ingredientsSelector: 'div[class="wprm-recipe-ingredient-group"] > ul > li',
        directionsSelector: 'div[class="wprm-recipe-instruction-group"] > ul > li',
    },
    'tasteofhome.com' : {
        titleSelector: 'h1[class="recipe-title"]',
        ingredientsSelector: 'div[class="recipe-ingredients"] > ul > li',
        directionsSelector: 'ol[class="recipe-directions__list"] > li',
    },
    'tasty.co' : {
        titleSelector: 'h1[class="recipe-name extra-bold xs-mb05 md-mb1"]',
        ingredientsSelector: 'div[class="ingredients-prep clearfix col"] > div > div > ul > li',
        directionsSelector: 'div[class="ingredients-prep clearfix col"] > div > ol > li',
    },
    'thepioneerwoman.com' : {
        titleSelector: 'h1[class="content-hed recipe-hed"]',
        ingredientsSelector: 'div[class="ingredient-lists"] > div',
        directionsSelector: 'div[class="direction-lists"] > ol > li',
    },
    'thestayathomechef.com' : {
        titleSelector: 'header[class="article-header"] > h1',
        ingredientsSelector: 'ul[class="wprm-recipe-ingredients"] > li',
        directionsSelector: 'ul[class="wprm-recipe-instructions"] > li',
    },
    'valio.fi' : {
        titleSelector: 'h1[class^="Title"]',
        ingredientsSelector: 'td[class^="IngredientRowRight"]',
        ingredientsAmountSelector: 'td[class^="IngredientRowLeft"]',
        directionsSelector: 'div[class^="InstructionsRowRight"]'
    },
    'whatsgabycooking.com' : {
        titleSelector: 'h1[class="entry-title"]',
        ingredientsSelector: 'li[class="wprm-recipe-ingredient"]',
        directionsSelector: 'div[class="wprm-recipe-instruction-text"]',
    },
    'yhteishyva.fi' : {
        titleSelector: 'h1[class~="title"]',
        ingredientsSelector: 'div.recipe__ingredients div.ingredient-row > div[class~="name"]',
        ingredientsAmountSelector: 'div.recipe__ingredients div.ingredient-row > div[class~="amount"]',
        directionsSelector: 'div.recipe__step-ingredients > div > p'
    }
}

// Wishlist
// Weird 'deselect all' https://www.foodnetwork.com/recipes/alton-brown/cocoa-brownies-recipe-2085484
// cafedelites.com
// get rid of silly unicode checkboxes: https://www.spendwithpennies.com/easy-meatball-recipe/
// https://www.eatwell101.com   