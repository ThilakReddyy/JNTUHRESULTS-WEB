
import React, { useState } from 'react';

const PrintButton = () => {
  const print = () => {
    setTimeout(function () {
      window.print();
    }, 500);
  }

  return(
    <>
      <div className="printi flex flex-col items-center invisible md:visible">
        <button onClick={print} className="bg-blue-500 text-white font-bold rounded md:p-2 md:my-2">Print</button>
      </div>
    </>
  )
}
export default PrintButton



