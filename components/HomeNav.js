import Image from 'next/image'
import Link from 'next/link'
import Hr from './Hr'
const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}


const HomeNav = ()=>
{

    return (
    <>
        <div class="mx-[12.5%]  flex">
            <Link href="/">
                <a >
                    <img src='./logo.png' className="w-[60px]  sm:w-[120px]"/>
                   
                </a>
            </Link>
            <Link href='https://github.com/ThilakReddyy/'>
                <a class="absolute right-[12.5%] mt-2 sm:mt-4">
                    <img src='./github.png' className="w-[12.5px] sm:w-[25px]"/>
                </a>
            </Link>
        </div>
        <Hr />
    </>
    )
}
export default HomeNav;