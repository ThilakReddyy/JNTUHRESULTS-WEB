import { MdOutlineCottage, MdOutlineSchool } from 'react-icons/md'
import { BsLayoutTextSidebarReverse } from 'react-icons/bs'
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineLiveHelp } from "react-icons/md";

import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})
const NavMenu = ({ handleNavBar }) => {

    return (<>

        <div className={`${inter.variable} font-Inter font-sans fixed  z-10 w-full bg-white h-full mt-[60px] md:mt-[0px]  mr-0 shadow-xl md:flex md:h-[25px] md:shadow-none md:w-auto md:right-[100px]`}>


            <Link href='/'>
                <div className="mt-[21px] text-[#030303] text-base	 font-normal flex align-center ml-[20px] md:mt-[0px] " onClick={handleNavBar}>
                    <MdOutlineCottage size={20} className='md:hidden mt-[3px]' />
                    <p className='ml-[20px] cursor-pointer p-[3px] pt-0  border border-white md:hover:bg-black md:hover:text-white md:hover:border-black md:hover:rounded'>Home</p>
                </div>
            </Link>
            <Link href='/academicreport'>
                <div className="mt-[21px] text-[#030303] text-base	 font-normal flex align-center ml-[20px] md:mt-[0px]" onClick={handleNavBar}>
                    <MdOutlineSchool size={22} className='md:hidden mt-[3px]' />
                    <p className='ml-[18px] cursor-pointer p-[3px]  pt-0 border border-white  md:hover:bg-black md:hover:text-white md:hover:border-black md:hover:rounded'>Academic Result</p>
                </div>
            </Link>
            <Link href='/classresult'>
                <div className="mt-[21px] text-[#030303] text-base	 font-normal flex align-center ml-[20px] md:mt-[0px]" onClick={handleNavBar}>
                    <BsLayoutTextSidebarReverse size={17} className='md:hidden mt-[3px] ml-[2px]' />
                    <p className='ml-[20px] cursor-pointer p-[3px] pt-0  border border-white md:hover:bg-black md:hover:text-white md:hover:border-black md:hover:rounded'>Class Results</p>
                </div>
            </Link>
            <Link href='/notifications'>
                <div className="mt-[21px] text-[#030303] text-base	 font-normal flex align-center ml-[20px] md:mt-[0px]" onClick={handleNavBar}>
                    <IoIosNotificationsOutline size={24} className='md:hidden mt-[4px] ml-[2px]' />
                    <p className='ml-[18px] cursor-pointer p-[3px] md:pt-0 border border-white md:hover:bg-black md:hover:text-white border-black md:hover:rounded'>Notifications</p>
                </div>
            </Link>
            <div className='md:hidden'>
                <Link href='/helpcenter'>
                    <div className="mt-[21px] text-[#030303] text-base	 font-normal flex align-center ml-[20px] md:mt-[0px]" onClick={handleNavBar}>
                        <MdOutlineLiveHelp size={24} className='md:hidden mt-[4px] ml-[2px]' />
                        <p className='ml-[18px] cursor-pointer p-[3px] md:pt-0 border border-white md:hover:bg-black md:hover:text-white border-black md:hover:rounded'>Help Center</p>
                    </div>
                </Link>
            </div>
            <div className='bottom-0 md:hidden fixed w-full'>
                <center >
                    <div className="flex justify-center mt-4 text-sm text-gray-600">
                        <a href="https://github.com/thilakreddyy" className="mx-2 hover:text-gray-900">
                            <FaGithub />
                        </a>
                        <a href="https://twitter.com/thilakreddyonly" className="mx-2 hover:text-gray-900">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com/__thilak_reddy__/" className="mx-2 hover:text-gray-900">
                            <FaInstagram />
                        </a>
                    </div>
                    <div className="flex justify-center m-2 text-xs	 text-gray-600">
                        <p>&copy; 2023 jntuhresults.vercel.app</p>
                    </div>

                </center>
            </div>
        </div>
    </>)
}
export default NavMenu;
