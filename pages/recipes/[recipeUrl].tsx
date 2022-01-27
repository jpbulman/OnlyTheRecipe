import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { RecipeMetadata } from '../../lib/recipes'
import { GetOrCreateRecipeEntry } from '../api/recipes'

export default function Recipe() {
    const [data, setData] = useState({} as RecipeMetadata)
    const [isLoading, setLoading] = useState(false)

    const { ingredients, directions } = data

    const reqBody: GetOrCreateRecipeEntry = {
        url: "https://www.allrecipes.com/recipe/263959/fluffy-japanese-pancakes/"
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
    if (!data) return <p>No profile data</p>

    console.log(data.ingredients)
    return (
        <Layout>
            <Head>
                <title>asdfsdf</title>
            </Head>
            <div>
                <h1>Ingredients</h1>
                {ingredients?.map(i => <p>{i}</p>)}
                <h1>Directions</h1>
                {directions?.map(i => <p>{i}</p>)}
            </div>
        </Layout>
    )
}
