import Image from "next/image";
import Link from "next/link";

const HomeBanner = ({ closeBanner }) => {
    return (
        <>
            <center className='mx-[10%]  shadow-2xl rounded-md border-1 border-black border-solid bg-stone-200'>
                <button className="absolute right-[11.7%] sm:right-[11%]" onClick={closeBanner}>
                    [x]
                </button>
                <div className="py-[7%] px-[2%]">

                    <div className="font-semibold">Check the TS 10th class results in a quicker manner &nbsp;
                        <br />
                        {/* <a>
                            <Link href="https://tssscresult.vercel.app/">
                                <strong>
                                    TS-SSC Results
                                </strong>
                            </Link>
                        </a> */}
                    </div>
                    <a>
                        <Link href="https://tssscresult.vercel.app/">
                            <img src='./tsscresult.png' href="https://tssscresult.vercel.app/" className="w-[60px]  sm:w-[120px]" />
                        </Link>
                    </a>
                    <small>Get your Results with your CGPA in a second</small>
                    <br />
                    <br />
                    {/* <div>Check out the another Version of JNTUH RESULTS
                        <a>
                            <Link href="https://jntuh-results-stats.vercel.app/">
                                <strong className="hover:cursor-pointer"> here</strong>
                            </Link>
                        </a>
                    </div> */}
                </div>
            </center>
        </>
    )
}

export default HomeBanner;