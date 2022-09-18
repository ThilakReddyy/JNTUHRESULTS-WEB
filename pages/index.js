import Head from 'next/head'
import Image from 'next/image'
import Homepage from '../components/Homepage'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>JNTUH B.Tech Results</title>
        <link rel='icon' href='/favicon.png' />
        <meta
          property='og:url'
          content='https://jntuhresults.vercel.app/'
        />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='JNTUH B.Tech Results' />
        <meta name='twitter:card' content='summary' />
        <meta name="viewport" content="width=1024"></meta>
        <meta
          property='og:description'
          content='You can find the Results of your entire B Tech semesters here of Jawaharlal Nehru Technological University, Hyderabad (JNTUH).'
        />
        <meta
          property='og:image'
          content={
            'https://user-images.githubusercontent.com/64121161/168486734-5d799aed-6110-47aa-8338-a0aa3c70e963.png'
          }
        />
      </Head>
      <Homepage />
    </div>
  )
}
