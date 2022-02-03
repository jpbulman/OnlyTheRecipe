import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Only The Recipe'
export const siteTitle = 'Only The Recipe'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        {/* https://css-tricks.com/emoji-as-a-favicon/ */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌯</text></svg>"></link>
        <meta
          name="description"
          content="Get just the recipe information"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <h1 className={utilStyles.heading5Xl}>🌯</h1>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <h1 className={utilStyles.heading5Xl}>🌯</h1>
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
          <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }} >
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
      )}
    </div>
  )
}
