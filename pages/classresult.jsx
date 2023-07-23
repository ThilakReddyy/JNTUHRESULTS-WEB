import ClassResultPage from "../components/ClassResult/ClassResultPage";
import Head from 'next/head';

const classresult = () => {

    return (
        <>
            <Head>
                <title>
                    JNTUH RESULTS | CLASS RESULT
                </title>
                <meta
                    name="description"
                    content="Check out Class result with in a go."
                    key="desc"
                />
            </Head>
            <ClassResultPage />
        </>
    )
}

export default classresult;