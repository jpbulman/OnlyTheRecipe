import { combineIngredientNamesAndAmounts, getItemListFromSelector, getTitleFromSelector, IngredientsSection, RecipeMetadata } from "../recipes";
import cheerio from 'cheerio';
import { annoyingToParseDomains } from "./selectors";

interface JoyFoodSunshineIngredientArray {
    ingredients: [{
        uid: number,
        amount: string,
        unit: string,
        name: string,
        notes: string,
        converted: {
            [key: string]: {
                amount: string,
                unit: string,
                unit_id: number
            }
        },
        unit_id: number,
        id: number
    }]
}

// This is a part of the schema.org standard for Recipe: https://schema.org/Recipe
// If you find another site which shares some/all fields with this, I think 
// this should be named something more generic so that this interface can be
// shared by both sites.
interface Soppa365Data {
    "@context": string,
    "@graph": [{
        "@type": string,
        name: string,
        description: string,
        author: {
            "@type": string,
            name: string
        },
        prepTime: string,
        totalTime: string,
        datePublished: string,
        recipeCategory: string[],
        recipeIngredient: string[],
        recipeInstructions: [{
            "@type": string,
            text: string
        }],
        recipeYield: string,
        image: {
            "@type": string,
            representativeOfPage: "True" | "False",
            url: string
        },
        keywords: string[]
    }]
}

const getBonAppetitData = (html: string): RecipeMetadata => {
    const title = getTitleFromSelector(html, 'h1[data-testid="ContentHeaderHed"]')

    const $ = cheerio.load(html);
    const ingredientsBlock = $('div[data-testid="IngredientList"] > div > ');

    const ingredientSections: IngredientsSection[] = []
    let currIngredientSectionName = ''
    let ingredientAmounts = []
    let ingredientNames = []

    ingredientsBlock.map((_, element) => {
        const className = $(element).attr('class')
        const elementText = $(element).text().trim()

        if (className.includes('SubHed')) {
            if (currIngredientSectionName !== '') {
                ingredientSections.push({
                    sectionName: currIngredientSectionName,
                    ingredients: combineIngredientNamesAndAmounts(ingredientNames, ingredientAmounts)
                })
                ingredientAmounts = []
                ingredientNames = []
            }

            currIngredientSectionName = elementText
        } else if (className.includes('Amount')) {
            ingredientAmounts.push(elementText)
        } else {
            ingredientNames.push(elementText)
        }
    });

    ingredientSections.push({
        sectionName: currIngredientSectionName,
        ingredients: combineIngredientNamesAndAmounts(ingredientNames, ingredientAmounts)
    })

    const directionsBlock = getItemListFromSelector(html, 'div[data-testid="InstructionsWrapper"] > div > div > div > div > p');

    return {
        title,
        ingredients: ingredientSections,
        directions: directionsBlock,
        domainIsSupported: true,
    }
}

const getJoyFoodSunshineData = (html: string): RecipeMetadata => {
    const title = getTitleFromSelector(html, 'h2.wprm-recipe-name')

    const $ = cheerio.load(html);

    const directions: string[] = $("div.wprm-recipe-instruction-text").toArray().map(element => $(element).text().trim());

    // The html contains the ingredients in a javascript array, so here we locate where that array is
    const ingredientsStart = html.indexOf(' = {"ingredients":[');
    if (ingredientsStart === -1) {
        // The array wasn't found
        return {
            title,
            ingredients: [],
            directions,
            domainIsSupported: true
        }
    }

    const jsonStart = ingredientsStart + 3; // +3 to remove the " = " from the beginning
    const jsonEnd = html.indexOf(';</script>', jsonStart);

    // Parse the javascript array
    const json: JoyFoodSunshineIngredientArray = JSON.parse(html.slice(jsonStart, jsonEnd));

    const ingredients: IngredientsSection = {
        sectionName: "Ingredients",
        ingredients: json.ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name} ${ing.notes}`.trim())
    }

    return {
        title,
        ingredients: [ingredients],
        directions,
        domainIsSupported: true
    }
}

const getNYTCookingData = (html: string): RecipeMetadata => {
    const title = getTitleFromSelector(html, 'h1[class="recipe-title title name"]')

    const $ = cheerio.load(html);
    const ingredientsBlock = $('section[class="recipe-ingredients-wrap"] > ');

    const ingredientSections: IngredientsSection[] = []
    let currIngredientSectionName = ''
    let ingredientNames: string[] = []

    for (const element of ingredientsBlock.toArray()) {
        const className = $(element).attr('class')
        const elementText = $(element).text().trim()

        // For some reason the nutritional guide has the same CSS classes as the ingredients, so we want to skip those
        if ($(element).find('div[class="nutrition-container"]').length > 0) {
            continue;
        } else if (className === 'part-name') {
            if (currIngredientSectionName !== '') {
                ingredientSections.push({
                    sectionName: currIngredientSectionName,
                    ingredients: ingredientNames
                })
                ingredientNames = []
            }

            currIngredientSectionName = elementText
        } else if (className === 'recipe-ingredients') {
            $(element).find('li').map((i, el) => {
                ingredientNames.push($(el).text().trim())
            })
        }
    }

    ingredientSections.push({
        sectionName: currIngredientSectionName,
        ingredients: ingredientNames
    })

    return {
        title,
        ingredients: ingredientSections,
        directions: getItemListFromSelector(html, 'ol[class="recipe-steps"] > li'),
        domainIsSupported: true
    }
}

const getSoppa365Data = (html: string): RecipeMetadata => {
    const jsonStart = html.indexOf('{"@context":"https://schema.org","@graph":');
    
    const title = getTitleFromSelector(html, 'meta[property="og:title"]');

    if(jsonStart === -1){
        return {
            title,
            directions: [],
            ingredients: [],
            domainIsSupported: true,
        }
    }
    
    const jsonEnd = html.indexOf('</script>', jsonStart);

    const data: Soppa365Data = JSON.parse(html.slice(jsonStart, jsonEnd));

    return {
        title,
        directions: data["@graph"][0].recipeInstructions.map(instruction => instruction.text),
        domainIsSupported: true,
        ingredients: [{
            sectionName: "Ingredients",
            ingredients: data["@graph"][0].recipeIngredient
        }]
    }
}

const getTastyCoData = (html: string): RecipeMetadata => {
    const $ = cheerio.load(html);
    const title = $('h1').text().trim()

    const divs = $('div');
    const ingredientWrappers = divs.filter((_, d) => $(d).attr('class')?.includes("ingredients__section"))

    // For some reason there are two copies in of each ingredient
    const sectionsStringSet = new Set<string>()
    const ingredientsSections: IngredientsSection[] = []
    ingredientWrappers.map((_, el) => {
        const currIngs: string[] = []
        $(el).find('li').map((idx, el) => {
            currIngs.push($(el).text().trim())
        })
        const currSection: IngredientsSection = {
            sectionName: $(el).find('p').text().trim(),
            ingredients: currIngs
        }
        const sectionString = JSON.stringify(currSection)
        if (!sectionsStringSet.has(sectionString)) {
            ingredientsSections.push(currSection)
            sectionsStringSet.add(sectionString)
        }
    })

    const directionsList = $('ol > li')
    const directionsSet = new Set<string>()
    directionsList.map((_, el) => {
        directionsSet.add($(el).text().trim())
    })

    return {
        title,
        ingredients: ingredientsSections,
        directions: Array.from(directionsSet),
        domainIsSupported: true,
    }
}

const getChefkochData = (html: string): RecipeMetadata => {
    const title = getTitleFromSelector(html, 'main.ds-container h1');
    const $ = cheerio.load(html);
    const ingredientsBlock = $('.ingredients');
    const ingredientSections: IngredientsSection[] = [];

    ingredientsBlock.map((_, element) => {
        const ingredientSectionName = $(element).find('th[colspan="2"] h3').text().trim();
        const ingredientAmounts = [];
        const ingredientNames = [];
        $(element).find('tr td').map((index, element) => {
            const text = $(element).text().trim();
            if (index % 2 === 0) {
                ingredientAmounts.push(text);
            }
            else {
                ingredientNames.push(text);
            }
        });
        ingredientSections.push({
            sectionName: ingredientSectionName,
            ingredients: combineIngredientNamesAndAmounts(ingredientNames, ingredientAmounts),
        });
    });

    const directionsBlock = $('.ds-recipe-meta + div').text().trim().split('\n\n');
    return {
        title,
        ingredients: ingredientSections,
        directions: directionsBlock,
        domainIsSupported: true,
    }
}

type annoyingDomainToSelectionFunction = {
    [key in typeof annoyingToParseDomains[number]]: (html: string) => RecipeMetadata
}

export const selectionFunctionPerAnnoyingDomain : annoyingDomainToSelectionFunction = {
    'bonappetit.com' : getBonAppetitData,
    'joyfoodsunshine.com' : getJoyFoodSunshineData,
    'cooking.nytimes.com' : getNYTCookingData,
    'soppa365.fi' : getSoppa365Data,
    'tasty.co' : getTastyCoData,
    'chefkoch.de' : getChefkochData,
}