import { NextApiRequest, NextApiResponse } from 'next'
import { getRecipeInformationForURLAsync } from '../../lib/recipes';

export interface GetOrCreateRecipeEntry {
    url: string
}

export default async (request: NextApiRequest, res: NextApiResponse) => {
    const { body } = request;
    const entryRequest = body as GetOrCreateRecipeEntry;

    try {
        const data = await getRecipeInformationForURLAsync(entryRequest.url);
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        console.log(entryRequest)
        res.status(500).json({})
    }
}
