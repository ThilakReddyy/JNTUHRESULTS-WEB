import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';
import { GoMarkGithub } from 'react-icons/go';
import Image from 'next/image';
import NavMenu from './NavMenu';
import { useState, useEffect } from 'react';

const NavBar = () => {

    const [NavMenuOpen, setNavMenuOpen] = useState(false);
    useEffect(() => {
        const handleClick = (event) => {
            if ((NavMenuOpen && event.target.closest('#nav-menu') == null) && (event.target.id !== "navBarMenuIcon")) {
                setNavMenuOpen(false)
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [NavMenuOpen]);

    const handleNavBar = () => {

        setNavMenuOpen(!NavMenuOpen);
    }


    return (<>


        <nav className="shadow-xl flex py-[18px] h-[60px] w-full items-center md:px-[20px] md:mb-[20px] z-999 bg-white fixed " >
            <div className="flex-1 flex justify-start md:hidden" onClick={handleNavBar}

            >
                <HiOutlineBars3BottomLeft size={28} className="mx-4" id="navBarMenuIcon" />
            </div>
            <div className="flex-2 justify-center mt-[5px] ">

                <Image
                    src="/logo.png"
                    alt="Jntuh Results logo"
                    width={72}
                    height={57}

                />
            </div>
            <div id="nav-menu">
                <div className={` fixed top-0 left-0 z-50 ${NavMenuOpen ? 'z-100 block opacity-100' : 'hidden opacity-0 pointer-events-none'}  md:block md:opacity-100 md:pointer-events-auto md:left-auto md:py-[20px]`}  >
                    <NavMenu handleNavBar={handleNavBar} />
                </div>
            </div>
            <div className="flex-1 flex justify-end">
                <a href="https://github.com/ThilakReddyy/JNTUHRESULTS-WEB/" aria-label="github jntuhresults-web">
                    <GoMarkGithub size={20} className="mx-4 " />
                </a>
            </div>
        </nav>

    </>
    )
}
export default NavBar;