import Link from "next/link";
import HomeBanner from "./HomeBanner";
import React,{useState} from 'react';
import Script from "next/script";
const HomeFooter = ()=>
{
    const closeBanner=()=>{
        
       setHomeBanner(<></>)
    }
    const [homeBanner,setHomeBanner]=useState(<HomeBanner closeBanner={closeBanner}/>)
    return (
    <>

        <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[65%] sm:text-[100%]">
            Made with ❤ by &nbsp;
            <Link href="https://github.com/ThilakReddyy/" >
                <a target="_blank" className="font-bold text-[#9C1A8B]" >
                    Thilak Reddy
                </a>
            </Link>
        </p>
        <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[67%] sm:text-[100%]">
            If you found this app helpful, you can support me by &nbsp;
            <Link href="https://www.buymeacoffee.com/thilakreddy" >
                <a className="font-bold text-[#9C1A8B]">
                    buying me a pizza here.
                </a>
            </Link>
        </p>
        {/* {homeBanner} */}
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5512897194230969"
     crossorigin="anonymous"></Script>
        

    </>      
    )
}
export default HomeFooter;
