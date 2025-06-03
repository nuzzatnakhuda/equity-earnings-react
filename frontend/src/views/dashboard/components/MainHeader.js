import React from 'react'

export default function MainHeader({handlePrint}) {
  return (
    <>
    <header className="flex flex-col items-center justify-center mb-5">
     <div>
       <h1 className="font-bold uppercase tracking-wide text-4xl mp-5">
         Invoicer
       </h1>
     </div>
     {/* <div className="mt-3">
       <ul className="flex items-center justify-between justify-wrap">
         <li><button onClick={handlePrint} className="bg-gray-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all duration-300">Print</button></li>
         <li className="mx-2"><button className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-bule-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Download</button></li>
         <li><button className="bg-green-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300" >Send</button></li>
       </ul>

     </div> */}
   </header>
 </>
  )
}
