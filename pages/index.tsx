import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

export type RecipesQueryParameters = {
  originalURL: string,
}

export default function Home() {
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
      e.preventDefault()
      submitRecipe()
    }
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={utilStyles.recipeInputWrapper}>
        <form style={{width: '100%'}}>
          <input
            id="recipeLinkInput"
            type="text"
            placeholder="Recipe URL"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value) }
            onKeyDown={keyDown}
          />
        </form>
        <button
          type="submit"
          style={{ marginTop : 15 }}
          onClick={submitRecipe}
        >
          Get The Recipe
        </button>
        <p>No videos. No ads. No walls of text. Only the recipe.</p>
        <div style={{ display: 'flex', flexDirection: 'row', bottom: 0, position: 'fixed', paddingBottom: 15, }} >
            <a style={{ paddingRight: 10}} href="https://www.buymeacoffee.com/jpbulman" target="_blank">
              <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" 
                  alt="Buy Me A Coffee" 
                  className={utilStyles.coffee} />
            </a>
            <a href="https://github.com/jpbulman/OnlyTheRecipe" target="_blank">
              <Image
                  priority
                  src="/images/github.png"
                  width={32}
                  height={32}
                  alt="GitHub"
                />
            </a>
          </div>
      </div>
    </Layout>
  )
}
