import Footer from "../Footer/Footer.jsx";
import Banner from '../Footer/Banner'
import { useState } from "react";

const AcademicReportForm = ({ setHtno, warning, submit }) => {
    const [banner, setBanner] = useState(true);
    return (
        <div className={`${banner ? 'md:h-auto' : 'md:h-screen'} h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 md:py-[150px] pt-[75px]`}>
            <div className="w-[66%] mx-[17%] ">
                <div className="mx-[0.25%]  border-black shadow-2xl border-[3px] rounded-md ">
                    <center className="py-[35px]">
                        <br />
                        <h2 className="leading-normal  font-semibold mx-1  text-[1xl] sm:text-2xl">
                            Academic Performance
                        </h2>

                        <br />
                        <br />
                        <input name="htno"
                            onChange={(event) => {
                                event.target.value = event.target.value.toUpperCase();
                                setHtno(event.target.value)

                            }}
                            className="border-[1px] m-[9.8px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] md:m-0"
                            type="text"
                            maxLength={10}
                            placeholder="Enter your hall ticket no"
                        />
                        <br />
                        <br />
                        <p className="text-[60%] text-red-600">{warning}</p>
                        <br />
                        <button
                            type="submit"
                            onClick={submit}
                            className="w-[100px] text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded text-sm hover:bg-gradient-to-r hover:from-yellow-400 hover:to-green-400 py-1.5 px-3 sm:w-auto sm:text-base"
                            style={{
                                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                                letterSpacing: "0.025em",
                                transition: "background 0.3s ease",
                                fontFamily: "sans-serif",
                            }}
                        >
                            Results
                        </button>
                        <br />
                        <br />
                    </center>
                </div>
            </div>
            <Footer />
            <div className={`${banner ? 'block' : 'hidden'}`}>
                <Banner setBanner={setBanner} />
            </div>

        </div>
    )
}
export default AcademicReportForm