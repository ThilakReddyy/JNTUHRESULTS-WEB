import NotificationScraper from "../components/Notifications/Notificationscraper"
import Head from 'next/head';

const notifications = () => {
    return (
        <>
            <Head>
                <title>
                    JNTUH RESULTS | Notifications
                </title>
                <meta
                    name="description"
                    content="Check out notifications with in a go."
                    key="desc"
                />
            </Head>
            <NotificationScraper />
        </>
    )
}

export default notifications;