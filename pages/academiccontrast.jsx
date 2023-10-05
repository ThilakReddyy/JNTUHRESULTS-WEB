import AcademicContrastPage from "../components/AcademicContrast/AcademicContrastPage";
import Head from 'next/head';

const academicreport = () => {
    return (
        <>
            <Head>
                <title>
                    JNTUH RESULTS | ACADEMIC CONTRAST
                </title>
                <meta
                    name="description"
                    content="Compare Academic Performance Across Semesters with Classmate."
                    key="desc"
                />
            </Head>
            <AcademicContrastPage />
        </>
    )
}

export default academicreport;