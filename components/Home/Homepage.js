import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const HomePage = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    });
  }, []);
  return (
    <div className='__variable_0ec1f4'>
      <div className=" ms:h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
        <div className="  md:flex justify-center  p-8 pt-[100px] ">
          <center className='md:flex font-montser text-[28px] md:text-[50px] lg:text-[70px] '>
            Welcome to&nbsp;
            <div className='text-blue-400 hover:text-blue-600 hover:underline'>
              <Link href="/">
                JNTUH Results!
              </Link>
            </div>


          </center>
          <br />

        </div>
        <center>


          <div className="home-links flex flex-wrap items-center justify-around max-w-4xl md:mt-6  sm:w-full">
            <Link href="/academicreport">

              <div className="border  hover:drop-shadow-sm group text-black border-slate-800 md:border-gray-100 shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300" >
                <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                  <div className="flex flex-row items-center justify-start">
                    <span className="p-1 text-black">Academic Results</span>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </h3>
                <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl"> Access your overall academic performance with just an hall ticket.</p>
              </div>
            </Link>

            <Link href="/academiccontrast">

              <div className="border border-slate-800 md:border-gray-100  hover:drop-shadow-sm group text-black text-white shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300" >
                <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                  <div className="flex flex-row items-center justify-start">
                    <span className="p-1">Results Contrast</span>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </h3>
                <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">Compare your academic performance across all semesters with your classmate.
                </p>
              </div>
            </Link>



            <Link href="/classresult">

              <div className="border border-slate-800 md:border-gray-100  hover:drop-shadow-sm group text-black text-white shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300" >
                <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                  <div className="flex flex-row items-center justify-start">
                    <span className="p-1 text-black">Class Results</span>
                    <svg stroke="currentColor" color='black' fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </h3>
                <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">View the results of your classmates and compare your performance with theirs.
                </p>
              </div>
            </Link>


            <Link href="/backlogreport" className='md:hidden'>

              <div className="border border-slate-800 md:border-gray-100  hover:drop-shadow-sm group text-black  shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300" >
                <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                  <div className="flex flex-row items-center justify-start">
                    <span className="p-1">Backlog Report</span>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </h3>
                <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">Access your overall backlogs report with an hallticket.
                </p>
              </div>
            </Link>
            <Link href="/notifications" className='md:hidden'>

              <div className="border border-slate-800 md:border-gray-100  hover:drop-shadow-sm group text-black  shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300" >
                <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                  <div className="flex flex-row items-center justify-start">
                    <span className="p-1">Notifications</span>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </h3>
                <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">Get all the latest Notifications from JNTUH
                </p>
              </div>
            </Link>
            <Link href="/helpcenter">

              <div className="border border-slate-800 md:border-gray-100  hover:drop-shadow-sm group text-black text-white shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300" >
                <h3 className="group-hover:text-black text-lg sm:text-2xl font-bold">
                  <div className="flex flex-row items-center justify-start">
                    <span className="p-1">Help Center</span>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </h3>
                <p className="group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl">Discover a Bug? Report it and Help us in Enhancing Your Experience!
                </p>
              </div>
            </Link>
          </div>
        </center>





        {/* Footer */}
        <footer className="ms:fixed w-full border-t py-6 mt-[30px]  bottom-0 ">
          <div className="md:h-8 ">
            <div className=" md:px-0">
              <p className="text-center text-sm md:text-lg  ">
                Developed by&nbsp;
                <a href="https://github.com/thilakreddyy" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                  Thilak Reddy
                </a>

              </p>
              <p className="text-center text-sm md:text-lg  ">
                Collaborators:&nbsp;
                <a href="https://github.com/hemanth-kotagiri" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                  Hemanth Kotagiri&nbsp;
                </a>
                and&nbsp;
                <a href="https://github.com/Syed-Ansar" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                  Syed Ansar
                </a>
              </p>
            </div>
          </div>
        </footer>


      </div>

    </div>)
}
export default HomePage;