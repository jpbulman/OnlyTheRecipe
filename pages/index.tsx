import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

export type RecipesQueryParameters = {
  originalURL: string,
}

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  const router = useRouter()
  const [inputValue, setInputValue] = useState("")

  const submitRecipe = () => {
    if (inputValue !== "") {
      const query: RecipesQueryParameters = { "originalURL": inputValue }
      router.push({ pathname: "/recipes", query })
    }
  }

  const keyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      submitRecipe()
    }
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={utilStyles.recipeInputWrapper}>
        <input
          id="recipeLinkInput"
          type="text"
          required
          placeholder="Recipe URL"
          onChange={(e: React.FormEvent<HTMLInputElement>) => { setInputValue(e.currentTarget.value) }}
          onKeyDown={keyDown}
        />
        <button
          type="submit"
          style={{ marginTop : 15 }}
          onClick={submitRecipe}
        >
          Get The Recipe
        </button>
        <p>No videos. No ads. No walls of text. Only the recipe.</p>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
