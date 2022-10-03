import Image from "next/image";
import Link from "next/link";

const HomeBanner = ({closeBanner}) => {
    return (
        <>
            <center className='mx-[10%]  shadow-2xl rounded-md border-1 border-black border-solid bg-stone-200'>
                <button className="absolute right-[11.7%] sm:right-[11%]" onClick={closeBanner}>
                    [x]
                </button>
                <div className="py-[7%] px-[2%]">
                    <div>This is a lite version of &nbsp;
                        <Link href="https://jntuhresults.vercel.app/">
                            <strong>
                                JNTUH Results
                            </strong>
                        </Link>
                    </div>
                    <img src='./logo.png' href="https://jntuhresults.vercel.app/" className="w-[60px]  sm:w-[120px]"/>
                    
                    <div>Check out the full Version of JNTUH RESULTS 
                        <Link href="https://jntuh-results-stats.vercel.app/">
                            <strong > here</strong>
                        </Link>
                    </div>
                </div>
            </center>
        </>
    )
}

export default HomeBanner;