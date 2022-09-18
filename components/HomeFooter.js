import Link from "next/link";

const HomeFooter = ()=>
{

    return (
    <>
        <p class="mt-1 block text-left ml-[12%]  text-center mb-4">
            Made with ❤ by &nbsp;
            <Link href="https://github.com/ThilakReddyy/" >
                <a target="_blank" class="font-bold text-[#9C1A8B]" >
                    Thilak Reddy
                </a>
            </Link>
        </p>
        <p class="mt-1 block text-left  ml-[12%]  text-center mb-4">
            If you found this app helpful, you can support me by &nbsp;
            <Link href="https://www.buymeacoffee.com/thilakreddy" >
                <a class="font-bold text-[#9C1A8B]">
                    buying me a pizza here.
                </a>
            </Link>
        </p>
    </>      
    )
}
export default HomeFooter;