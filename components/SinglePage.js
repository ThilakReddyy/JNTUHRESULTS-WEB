
import { getRouteMatcher } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useRouter } from 'next/router'
import HomeNav from './HomeNav'
import SingleResults from './SingleResults'
const SinglePage=()=>
{
    const router = useRouter()
    return(
        <>
        <HomeNav />
        <SingleResults />
        </>
    )
}

export default SinglePage;
