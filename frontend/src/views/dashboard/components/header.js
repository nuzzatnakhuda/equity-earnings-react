import React from 'react'

export default function header({handlePrint}) {
  return (
    <>
       <header className="flex flex-col items-center justify-center mb-5">
        <div>
          <h1 className="font-bold uppercase tracking-wide text-4xl mp-5">
            Invoicer
          </h1>
        </div>
        <div className="mt-3">
          <ul className="flex items-center justify-between justify-wrap">
            <li><button className="btn btn-print" onClick={handlePrint}>Print</button></li>
            <li><button className="btn btn-download">Download</button></li>
            <li><button className="btn btn-send">Send</button></li>
          </ul>

        </div>
      </header>
    </>
  )
}
