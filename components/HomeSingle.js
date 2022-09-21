const HomeSingle = () => {
    return (
      <>
        <form action="/Single" method="get" class="w-[75%] border-[3px] rounded-md border-black border-solid mx-[12.5%]">
            <center>
              <br />
              <h2 class="font-normal leading-normal mt-0 mb-2 font-bold mx-2 text-[1xl] sm:text-2xl">
                Grades of All Semesters of Particular Student
              </h2>
              <br />
              <br />
              <input name="htno" class="border-[1px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%]" type="text" maxLength="10" placeholder="Enter your Roll Number"/>
              <br />
              <br />
              <br />
              <button class="w-[70px] text-white	bg-blue-700 rounded mr-1.5 text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >
                Results
              </button>
              <br />
              <br />
            </center>
        </form>
      </>
    )
  }
export default HomeSingle