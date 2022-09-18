import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}

const HomeNav = ()=>
{

    return (
    <div class="mx-[12.5%] w-3/4  flex">
        <a href='/' class="md: w-1/4" >
            <Image loader={myLoader} 
            src='/logo.png' 
            width={132}
            height={100}  />
        </a>
        <a  href='https://github.com/ThilakReddyy/' class="absolute top-0 right-0 mt-6 mr-[14%]">
            <Image loader={myLoader} 
            src='/github.png' 
            width={30}
            height={30}  />
        </a>
    </div>
    )
}
export default HomeNav;