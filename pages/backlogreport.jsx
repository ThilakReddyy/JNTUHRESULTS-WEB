import AcademicReportPage from "../components/AcademicReport/AcademicReportPage";
import Head from 'next/head';

const academicreport = () => {
    return (
        <>
            <Head>
                <title>
                    JNTUH RESULTS | BACKLOG ASSESMENT
                </title>
                <meta
                    name="description"
                    content="Check out the backlogs result with in a go."
                    key="desc"
                />
            </Head>
            <AcademicReportPage backlog={true} />
        </>
    )
}

export default academicreport;