import React, { useState } from "react";
import { useRouter } from 'next/router'
import axios from 'axios';
import MultiResults from "../Multi/MultiResults";
import Loading from "../Loading/Loading";
import url from "../api/api";
const Homemulti = ({homepage}) => {
    const router = useRouter();
    const submits=async()=>
    {
        if((htno1.length!=10 || htno2.length!=10 || code=="") || (htno1.slice(0,8)!=htno2.slice(0,8)) || (htno1.slice(8,10)>htno2.slice(8,10)))
        {
            alert("Please give the correct information!!")
        }
        else
        {
            homepage(<Loading />)
            const response=await axios.get(url+'/api/multi?from='+htno1+'&to='+htno2+'&code='+code,{mode:'cors'});
            homepage(<MultiResults query={response.data}/>)
        }
    }
    const inputEvent=(event)=>
    {
        event.target.value=event.target.value.toUpperCase();
        if(event.target.name=="htno_1")
        {
            setHtno1(event.target.value)
        }
        else if(event.target.name=="htno_2")
        {
            setHtno2(event.target.value)
        }
        else if(event.target.name=="code")
        {
            setCode(event.target.value)
        }
        
    }
  const [htno1, setHtno1] = useState("");
  const [htno2, setHtno2] = useState("");
  const [code, setCode] = useState("");
    return (
        <>
            <div  method="get" className="mx-[0.25%] border-[3px] rounded-md border-black border-solid">
                <center>
                    <br />
                    <h2 className="font-normal leading-normal mt-0 mb-2 font-bold mx-2 text-[1xl] sm:text-2xl">
                        Grades of All Students of Particular Semester
                    </h2>
                    <br />
                    <div>
                        <input onChange={inputEvent} name="htno_1" className="content-center border-[1px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] sm:mx-2" type="text" maxLength="10" placeholder="Enter From Roll Number" required/>
                        <input onChange={inputEvent} name="htno_2" className="my-2 content-center border-[1px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] md:my-0 sm:mx-2" type="text" maxLength="10" placeholder="Enter To Roll Number" required/>
                    </div>
                    <select name="code" onChange={inputEvent}   className="text-[60%] md:border-[0.5px] rounded border-black border-solid md:mt-[25px] md:text-[80%]">
                        <option >Semester</option>
                        <option defaultValue value="1-1">1-1</option>
                        <option value="1-2">1-2</option>
                        <option value="2-1">2-1</option>
                        <option value="2-2">2-2</option>
                        <option value="3-1">3-1</option>
                        <option value="3-2">3-2</option>
                        <option value="4-1">4-1</option>
                        <option value="4-2">4-2</option>
                    </select>
                    <br />
                    <br />
                    <button onClick={submits} className="w-[70px] text-white	bg-blue-700 rounded mr-1.5 text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >
                        Results
                    </button>
                    <br />
                    <br />
                </center>
            </div>
        </>
    )
}
export default Homemulti