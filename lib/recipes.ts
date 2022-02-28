import axios from 'axios';
import cheerio from 'cheerio';
import { defaultRecipeData } from '../pages/api/recipes';
import { selectionFunctionPerAnnoyingDomain } from './domain/annoyingDomains';
import { domainIsAnnoyingToParse, domainIsSupported, recipeSelectors } from './domain/selectors';

export type IngredientsSection = {
    sectionName: string,
    ingredients: string[],
}

export interface RecipeMetadata {
    title: string,
    ingredients: IngredientsSection[],
    directions: string[],
    domainIsSupported: boolean,
}

// https://stackoverflow.com/a/43467144/7355232
function isValidHttpUrl(string: string | URL) {
    let url: URL;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}

//onlytherecipe.org
export async function getRecipeInformationForURLAsync(url: string): Promise<RecipeMetadata> {
    const AxiosInstance = axios.create();
    const domainNotSupported = {
        ...defaultRecipeData,
        domainIsSupported: false,
    }

    const domain = getDomainFromURL(url)
    if (!isValidHttpUrl(url) || !domainIsSupported(domain)) {
        return domainNotSupported
    }

    return AxiosInstance.get(url)
        .then(
            response => {
                const html = response.data;

                return getRecipeDataForDomain(domain, html)
            }
        )
}

const getRecipeDataForDomain = (domain: string, html: string | Buffer): RecipeMetadata => {
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

export const combineIngredientNamesAndAmounts = (names: string[], amounts: string[]): string[] => {
    return amounts.map((val, idx) => `${val} ${names[idx]}`)
}

const getIngredients = (html: string | Buffer, domain: string): IngredientsSection[] => {
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

export const getItemListFromSelector = (html: string | Buffer, selector: string): string[] => {
    const $ = cheerio.load(html);

    const listItems = $(selector);
    const textValues: string[] = []
    listItems.map((_, element) => {
        textValues.push($(element).text().trim())
    });
    
    return textValues
}

export const getTitleFromSelector = (html: string | Buffer, selector: string): string => {
    const $ = cheerio.load(html);
    return $(selector).text().trim();
}

const getDomainFromURL = (url: string): string => {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
}
