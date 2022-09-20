import temp from "./temp"



const SingleResults=()=>
{
  const Results=temp[0]['Results'];
  const Details=temp[0]['Details'];
  return(
    <div class="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
      <div  id='1'>
        {/* <table class="w-[100%]">
          {Object.keys(Details).map((value,index)=>{return <><th>{value}</th><th>{Details[value]}</th></>})}
        </table> */}
        <table class="w-[100%]">
          <tbody>
            <tr>
              <th>1-1 Results</th>
            </tr>
          </tbody>
        </table>
        <table class="w-[100%]">
          <tbody>
            <tr>
              <th>NAME</th>
              <th>POTHUGANTI THILAK REDDY</th>     
              <th>Roll_No</th>   
              <th>18E51A0479</th>     
              <th>COLLEGE_CODE</th>   
              <th>E5</th> 
            </tr>
          </tbody>
        </table>
        <table>
        <tbody><tr>
        <th>SUBJECT_NAME</th>
        <th>SUBJECT_CODE</th>
        <th>GRADE</th>
        <th>CREDITS</th>
    </tr>
    
        
         
            
                <tr>
                    <th>PROGRAMMING FOR PROBLEM SOLVING LAB</th>
                    <th>15102</th>
                    <th>A</th>
                    <th>1.5</th>
                </tr>
            
         
            
                <tr>
                    <th>ENVIRONMENTAL SCIENCE</th>
                    <th>15103</th>
                    <th>A</th>
                    <th>0</th>
                </tr>
            
         
            
                <tr>
                    <th>APPLIED PHYSICS LAB</th>
                    <th>15104</th>
                    <th>A+</th>
                    <th>1.5</th>
                </tr>
            
         
            
                <tr>
                    <th>MATHEMATICS - I</th>
                    <th>151AA</th>
                    <th>C</th>
                    <th>4</th>
                </tr>
            
         
            
                <tr>
                    <th>PROGRAMMING FOR PROBLEM SOLVING</th>
                    <th>151AC</th>
                    <th>B</th>
                    <th>4</th>
                </tr>
            
         
            
                <tr>
                    <th>ENGINEERING GRAPHICS</th>
                    <th>151AD</th>
                    <th>B</th>
                    <th>3</th>
                </tr>
            
         
            
                <tr>
                    <th>APPLIED PHYSICS</th>
                    <th>151AE</th>
                    <th>C</th>
                    <th>4</th>
                </tr>
            
         
            
           
        </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th style={{width:'75%'}}>CGPA</th>
              <th>5.97</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default SingleResults

