import Link from "next/link";
import { useState } from "react";
const Banner = ({ setBanner }) => {

    const closeBanner = () => {
        setBanner(false);
    }
    return (
        <div className={`pb-[80px]`}>
            <center className={`mx-[10%] md:mx-[30%]   shadow-2xl rounded-md border-1 border-black border-solid bg-stone-200 hidden md:block `}>
                <button className="absolute right-[11.7%] sm:right-[31.7%]" onClick={closeBanner}>
                    [x]
                </button>
                <div className="py-[7%] px-[2%]">

                    {/* <div className="font-semibold">Check the TS 10th class results in a quicker manner &nbsp;
                        <br />
                        <a>
                            <Link href="https://tssscresult.vercel.app/">
                                <strong>
                                    TS-SSC Results
                                </strong>
                            </Link>
                        </a>
                    </div> */}
                    <small>Get your JNTUH Results with your CGPA in a second</small>
                    <br />


                    <img src='/logo.png' href="https://jntuhresults.vercel.app/" className="w-[60px]  sm:w-[120px]" />



                    <div>Check out the another Version of JNTUH RESULTS
                        <a>
                            <Link href="https://jntuh-results-stats.vercel.app/">
                                <strong className="hover:cursor-pointer"> here</strong>
                            </Link>
                        </a>
                    </div>
                </div>
            </center>
        </div>
    )
}
export default Banner;