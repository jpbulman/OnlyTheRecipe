import axios from 'axios';
import cheerio from 'cheerio';
import { domainToDirectionsListSelector, domainToIngredientAmountListSelector, domainToIngredientsListSelector, domainToTitleSelector } from './domain/selectors';

export interface RecipeMetadata {
    title: string,
    ingredients: string[],
    directions: string[],
}

//onlytherecipe.org
export async function getRecipeInformationForURLAsync(url: string): Promise<RecipeMetadata> {
    const AxiosInstance = axios.create();

    return AxiosInstance.get(url)
        .then(
            response => {
                const html = response.data;
                const domain = getDomainFromURL(url)

                const title = getTitleFromSelector(html, domainToTitleSelector[domain])
                const ingredients = getIngredients(html, domain)
                const directions = getItemListFromSelector(html, domainToDirectionsListSelector[domain])

                return {
                    title,
                    ingredients,
                    directions,
                }
            }
        )
}

const getIngredients = (html, domain: string) => {
    const ingredientNames = getItemListFromSelector(html, domainToIngredientsListSelector[domain])

    if (domain in domainToIngredientAmountListSelector) {
        const amounts = getItemListFromSelector(html, domainToIngredientAmountListSelector[domain])
        const paired = []
        amounts.map((val, idx) => {
            paired.push(val + " " + ingredientNames[idx])
        })

        return paired
    } else {
        return ingredientNames
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