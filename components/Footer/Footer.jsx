
const Footer = () => {
    return (
        <>
            {/* <div className="font-serif mt-1 block text-left text-[#808080] ml-[18.5%] mt-5 text-[55%] md:text-[80%]">
                It only works for 2023 Results
            </div> */}
            {/* <div className="font-serif mt-1 block text-left text-[#808080] ml-[18.5%] mb-3 text-[55%] md:text-[80%]">
                It does consider the Supplementary Results
            </div> */}
            <div className="font-serif mt-1 block text-left text-[#808080] ml-[18.5%] mt-5 text-[55%] md:text-[80%]">
                It does consider the RCRV Results
            </div>
            <div className="font-serif mt-1 block text-left text-[#808080] ml-[18.5%] mb-4 text-[55%] md:text-[80%]">
                It only works above R18 Regulation
            </div>
            <center><hr className="w-[64%] mt-4 mb-1 " /></center>
            <center><hr className="w-[64%]  text-[#808080]" /></center>
            <p className="mt-4 block text-left mx-[18%] text-center mb-4 text-[75%] sm:text-[100%]">
                Made with ❤ by &nbsp;

                <a target="_blank" rel="noreferrer" href="https://github.com/ThilakReddyy/" className=" underline	underline-offset-1" >
                    Thilak Reddy
                </a>

            </p>
            <p className="mt-1 block text-left mx-[18%] text-center mb-4 text-[75%] sm:text-[100%]">
                If you found this app helpful, you can support me by   &nbsp;

                <a target="__blank" rel="noreferrer" href="https://www.buymeacoffee.com/thilakreddy" className="underline	underline-offset-1">
                    buying me a pizza.
                </a>


            </p>

        </>
    )
}


export default Footer