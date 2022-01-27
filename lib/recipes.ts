import axios from 'axios';
import cheerio from 'cheerio';

export interface RecipeMetadata {
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
                const $ = cheerio.load(html);

                const ingredientsList = $('section[data-tracking-zone="recipe-ingredients"] > fieldset > ul > li');
                const ingredients: string[] = []
                ingredientsList.map((_, element) => {
                    ingredients.push($(element).text().trim())
                });

                const directionsListElements = $('ul[class="instructions-section"] > li')
                const directions: string[] = []
                directionsListElements.map((_, el) => {
                    directions.push($(el).text().trim())
                })

                return { 
                    ingredients,
                    directions,
                }
            }
        )
}