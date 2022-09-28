import Image from "next/image";
import Link from "next/link";

const HomeBanner = () => {
    return (
        <>
            <center className='mx-[10%] py-[5%] shadow-2xl rounded-md border-1 border-black border-solid bg-stone-200'>
                <small>This is a lite version of JNTUH Results</small>
                <img src='./logo.png' href="https://jntuh-results-stats.vercel.app/" className="w-[60px]  sm:w-[120px]"/>
                
                <div>Check out the full Version of JNTUH RESULTS 
                    <Link href="https://jntuh-results-stats.vercel.app/">
                        <strong > here</strong>
                    </Link>
                </div>
            </center>
        </>
    )
}

export default HomeBanner;