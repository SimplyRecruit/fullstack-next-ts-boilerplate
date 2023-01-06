import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { get } from './api/person/[index]'
import { Person } from '../types/person'

export default function Home({ person }: { person: Person }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.center}>
          {person.name}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const person: Person = await get(0)
  return { props: { person } }
}

