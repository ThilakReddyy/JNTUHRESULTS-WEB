import HomeNav from '../components/HomeNav';
import SingleResults from '../components/SingleResults';
import {useRouter} from 'next/router';
import axios from 'axios';
const Single=({query})=>
{
    console.log(query)
    console.log("yes")
    return(
        <>
        <SingleResults query={query}/>
        </>
    )
}
export default Single;

export async function getServerSideProps(context) {
    const htno=context.query.htno;
    console.log(htno);
    const response=await axios.get('http://jntuhresults.herokuapp.com/allResults?htno='+htno);
    console.log()
    if(response.status!=200){
       return
       {
        props:{query : 'server error'}
       } 
    }
    return {
        props: {query: await response.data}, // will be passed to the page component as props
      }
  }
  

