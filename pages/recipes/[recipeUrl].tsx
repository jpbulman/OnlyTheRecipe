import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Recipe({ recipeData }: {
    recipeData: {
        title: string
        date: string
        contentHtml: string
    }
}) {
  return (
    <Layout>
      <Head>
        <title>{recipeData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{recipeData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={recipeData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: recipeData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}
