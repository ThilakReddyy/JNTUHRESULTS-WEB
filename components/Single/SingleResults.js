import { useRouter } from 'next/router'

const SingleResults=({query})=>
{
  const Results=query['Results'];
  const Details=query['Details'];

  return(
    <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
        {Object.keys(Results).map((val,ind)=>{return <>
            <div id='1'>
              <table className="w-[100%]">
                <tbody>
                  <tr>
                    <th>{val} Results</th>
                  </tr>
                </tbody>
              </table>
              <table className="w-[100%]">
                <tbody>
                  <tr>
                    {Object.keys(Details).map((value,index)=>{return <><th>{value}</th><th>{Details[value]}</th></>})}
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <th>SUBJECT_NAME</th>
                    <th>SUBJECT_CODE</th>
                    <th>GRADE</th>
                    <th>CREDITS</th>
                  </tr>
                    {Object.keys(Results[val]).map(function(item,index,arr)
                    {
                        if(item!='CGPA' & item!='total' & item!='credits') 
                        {
                          return  <><tr>
                                      <th>{Results[val][item]['subject_name']}</th>
                                      <th>{Results[val][item]['subject_code']}</th>
                                      <th>{Results[val][item]['subject_grade']}</th>
                                      <th>{Results[val][item]['subject_credits']}</th>
                                    </tr>
                                  </>
                        }
                    })}
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <th style={{width:'75%'}}>CGPA</th>
                    <th>{Results[val]['CGPA']}</th>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
          </>})}
    </div>
  )
}
export default SingleResults



