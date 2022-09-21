import '../styles/globals.css'
import Header from '../components/Header'
import HomeNav from '../components/HomeNav'
function MyApp({ Component, pageProps }) {
  return <>
      <Header />
      <HomeNav />
      <Component {...pageProps} />
      </>
}

export default MyApp
