const Resultsi=function(value,index)
{
  const Details=temp['Details'];
  const Results=temp['Results'];
 return (<>
            <div id='1'>
              <table class="w-[100%]">
                <tbody>
                  <tr>
                    <th>{value} Results</th>
                  </tr>
                </tbody>
              </table>
              <table class="w-[100%]">
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
                    {Object.keys(Results[value]).map(function(item,index,arr)
                    {
                        if(item!='CGPA') 
                        {
                          return  <><tr>
                                      <th>{Results[value][item]['subject_name']}</th>
                                      <th>{Results[value][item]['subject_code']}</th>
                                      <th>{Results[value][item]['subject_grade']}</th>
                                      <th>{Results[value][item]['subject_credits']}</th>
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
                    <th>{Results[value]['CGPA']}</th>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
          </>
      )
}
