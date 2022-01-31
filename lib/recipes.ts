import axios from 'axios';
import cheerio from 'cheerio';
import { defaultRecipeData } from '../pages/api/recipes';
import { annoyingToParseDomains, domainIsAnnoyingToParse, domainIsSupported, recipeSelectors } from './domain/selectors';

type IngredientsSection = {
    sectionName: string,
    ingredients: string[],
}

export interface RecipeMetadata {
    title: string,
    ingredients: IngredientsSection[],
    directions: string[],
    domainIsSupported: boolean,
}

//onlytherecipe.org
export async function getRecipeInformationForURLAsync(url: string): Promise<RecipeMetadata> {
    const AxiosInstance = axios.create();

    return AxiosInstance.get(url)
        .then(
            response => {
                const html = response.data;
                const domain = getDomainFromURL(url)

                if (!domainIsSupported(domain)) {
                    return {
                        ...defaultRecipeData,
                        domainIsSupported: false,
                    }
                }

                return getRecipeDataForDomain(domain, html)
            }
        )
}

const getRecipeDataForDomain = (domain: string, html): RecipeMetadata => {
    if (domainIsAnnoyingToParse(domain)) {
        return selectionFunctionPerAnnoyingDomain[domain](html)
    }

    const { titleSelector, directionsSelector } = recipeSelectors[domain]
    const title = getTitleFromSelector(html, titleSelector)
    const ingredients = getIngredients(html, domain)
    const directions = getItemListFromSelector(html, directionsSelector)

    return {
        title,
        ingredients,
        directions,
        domainIsSupported: true,
    }
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

type annoyingDomainToSelectionFunction = {
    [key in typeof annoyingToParseDomains[number]]: (html: string) => RecipeMetadata
}

const selectionFunctionPerAnnoyingDomain : annoyingDomainToSelectionFunction = {
    'bonappetit.com' : getBonAppetitData
}

const combineIngredientNamesAndAmounts = (names: string[], amounts: string[]): string[] => {
    return amounts.map((val, idx) => `${val} ${names[idx]}`)
}

const getIngredients = (html, domain: string): IngredientsSection[] => {
    const { ingredientsSelector, ingredientsAmountSelector } = recipeSelectors[domain]
    const ingredientNames = getItemListFromSelector(html, ingredientsSelector)

    if (ingredientsAmountSelector) {
        const amounts = getItemListFromSelector(html, ingredientsAmountSelector)
        const paired = combineIngredientNamesAndAmounts(ingredientNames, amounts)

        return [{ sectionName: '', ingredients: paired, }]
    } else {
        return [{ sectionName: '', ingredients: ingredientNames, }]
    }
}

const getItemListFromSelector = (html, selector: string): string[] => {
    const $ = cheerio.load(html);

    const listItems = $(selector);
    const textValues: string[] = []
    listItems.map((_, element) => {
        textValues.push($(element).text().trim())
    });
    
    return textValues
}

const getTitleFromSelector = (html, selector: string): string => {
    const $ = cheerio.load(html);
    return $(selector).text().trim();
}

const getDomainFromURL = (url: string) => {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
}

// const getDirections = (html, domain: string) => {
//     const directions = getItemListFromSelector(html, domainToDirectionsListSelector[domain])
    
// }