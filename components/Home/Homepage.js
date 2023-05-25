import Loading from '../Loading/Loading'
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
  return (<>
    <div className=" md:block bg-gradient-to-b from-red-500 to-blue-700">
      <div className="h-screen flex justify-center items-center p-8">
        <center className='md:flex headertext font-montser text-[35px] md:text-[50px] lg:text-[70px] xl-[90px] 2xl:text-[120px] md:drop-shadow-md animate-fade-in text-gray-900 leading-tight'>
          JNTUH RESULTS
        </center>
      </div>
    </div>

    <div className='md:hidden'>


      {/* Features */}
      <section className="bg-white py-12 px-6 ">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-8">What&rsquo;s in JNTUH Results?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Academic Results</h3>
              <p className="text-gray-700">View your overall performance.</p>
              <div className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg mt-4 inline-block">
                <Link href="/academicreport">
                  View Academic Results

                </Link>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Class Results</h3>
              <p className="text-gray-700">View the results of your classmates and compare your performance with theirs.</p>
              <div className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg mt-4 inline-block">
                <Link href="/classresult">
                  View Class Results
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section >

      {/* Footer */}
      < footer className="bg-gray-800 py-2 px-6 text-center text-gray-500 text-sm fixed bottom-0 left-0 w-full hidden md:block" >
        <p>© 2023 jntuhresults.vercel.app. All rights reserved.</p>
      </footer >
    </div >

  </>)
}
export default HomePage;