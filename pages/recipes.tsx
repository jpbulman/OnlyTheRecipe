import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RecipesQueryParameters } from '.'
import Layout from '../components/layout'
import { defaultRecipeData, GetOrCreateRecipeEntry } from './api/recipes'

const domainNotSupported = (url: string) => {
    return (
        <Layout>
            <Head>
                <title>Recipe Not Supported</title>
            </Head>
            <div>
                <a href={url} target="_blank">Original URL</a>
                <h1>Uh-oh! 🔧</h1>
                <p>Unfortunately we couldn't parse this recipe. Please open an issue
                    <a href="https://github.com/jpbulman/OnlyTheRecipe/issues/new" target="_blank"> here </a>
                    (make sure to include the recipe URL!) and someone will try and add support for this recipe!
                </p>         
            </div>
        </Layout>
    )
}

export default function Recipe() {
    const router = useRouter()
    const [data, setData] = useState(defaultRecipeData)
    const [isLoading, setLoading] = useState(false)

    const { originalURL } = router.query as RecipesQueryParameters;

    useEffect(() => {
        if (!originalURL) {
            setLoading(true)
            return
        }

        const reqBody: GetOrCreateRecipeEntry = {
            url: originalURL,
        }

        const fetchData = async () => { 
            setLoading(true)
            await fetch('../api/recipes', {
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
        }
        fetchData()
    }, [setData, originalURL])

    const { ingredients, directions, title, domainIsSupported } = data

    if (isLoading) return <p>Loading...</p>
    if (!domainIsSupported) return domainNotSupported(originalURL)

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <h1>{title}</h1>
                <a href={originalURL} target="_blank">Original Recipe</a>
                <h2>Ingredients</h2>
                { ingredients.map((section, idx) => 
                    (
                        <>
                            <h3 key={`${section.sectionName}-${idx}`}>{section.sectionName}</h3>
                            { section.ingredients?.map((val, i) => <p key={`${val}-${i}}`}>{val}</p>) }
                        </>
                    )
                )}
                <h2>Directions</h2>
                { directions.map((direction, idx) => <p key={`${direction}-${idx}`}>{direction}</p>) }
            </div>
        </Layout>
    )
}
