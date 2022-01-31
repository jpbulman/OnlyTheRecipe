import { NextApiRequest, NextApiResponse } from 'next'
import { getRecipeInformationForURLAsync, RecipeMetadata } from '../../lib/recipes';

export interface GetOrCreateRecipeEntry {
    url: string
}

export const defaultRecipeData: RecipeMetadata = {
    title: '',
    ingredients: [],
    directions: [],
    domainIsSupported: true,
}

export default async (request: NextApiRequest, res: NextApiResponse) => {
    const { body } = request;
    const entryRequest = body as GetOrCreateRecipeEntry;

    try {
        const data = await getRecipeInformationForURLAsync(entryRequest.url);
        res.status(200).json(data)
    } catch (error) {
        console.log(entryRequest)
        console.log(error)
        res.status(208).json(defaultRecipeData)
    }
}
