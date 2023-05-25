import '../styles/globals.css'
import Layout from '../components/Layout/Layout';
import { Analytics } from '@vercel/analytics/react';
function MyApp({ Component, pageProps }) {


  return (<>
    <Layout >
      <Component {...pageProps} />
    </Layout>
    <Analytics />
  </>)
}

export default MyApp
