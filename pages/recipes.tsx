import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RecipesQueryParameters } from '.'
import Layout from '../components/layout'
import { RecipeMetadata } from '../lib/recipes'
import { GetOrCreateRecipeEntry } from './api/recipes'

const isValidRecipeData = (data: RecipeMetadata) => {
    const { title, ingredients, directions } = data 
    return title !== "" && ingredients?.length !== 0 && directions?.length !== 0;
}

const domainNotSupported = () => {
    return (
        <Layout>
            <Head>
                <title>Recipe Not Supported</title>
            </Head>
            <div>
                <h1>Uh-oh! 🔧</h1>
                <p>Unfortunately we couldn't parse this recipe. Please open an issue 
                    <a href="https://github.com/jpbulman/OnlyTheRecipe/issues/new" target="_blank"> here </a>
                    and someone will try and add support for this recipe!
                </p>         
            </div>
        </Layout>
    )
}

export default function Recipe() {
    const router = useRouter()
    const { originalURL } = router.query as RecipesQueryParameters;

    if (!originalURL) return <p>Loading...</p>

    const [data, setData] = useState({} as RecipeMetadata)
    const [isLoading, setLoading] = useState(false)

    const { ingredients, directions, title } = data

    const reqBody: GetOrCreateRecipeEntry = {
        url: originalURL,
    }

    useEffect(() => {
        setLoading(true)
        fetch('../api/recipes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
        .then((res) => res.json())
        .then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    console.log(data)
    if (!isValidRecipeData(data)) return domainNotSupported()

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <h1>{title}</h1>
                <a href={reqBody.url}>Original Recipe</a>
                <h1>Ingredients</h1>
                {ingredients?.map(i => <p>{i}</p>)}
                <h1>Directions</h1>
                {directions?.map(i => <p>{i}</p>)}
            </div>
        </Layout>
    )
}
