import SingleResults from '../components/Single/SingleResults';

import axios from 'axios';
const single=({query})=>
{
    
    return(
        <>
        
        <SingleResults query={query}/>
        </>
    )
}
export default single;

export async function getServerSideProps(context) {
    const htno=context.query.htno;
    console.log("called")
    const response=await axios.get('https://jntuhresults.up.railway.app/api/single?htno='+htno);

    return {
        props: {query: await response.data}, // will be passed to the page component as props
      }
  }
  

