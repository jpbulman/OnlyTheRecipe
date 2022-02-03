import { combineIngredientNamesAndAmounts, getItemListFromSelector, getTitleFromSelector, IngredientsSection, RecipeMetadata } from "../recipes";
import cheerio from 'cheerio';
import { annoyingToParseDomains } from "./selectors";

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

type annoyingDomainToSelectionFunction = {
    [key in typeof annoyingToParseDomains[number]]: (html: string) => RecipeMetadata
}

export const selectionFunctionPerAnnoyingDomain : annoyingDomainToSelectionFunction = {
    'bonappetit.com' : getBonAppetitData,
    'cooking.nytimes.com' : getNYTCookingData,
    'tasty.co' : getTastyCoData,
}