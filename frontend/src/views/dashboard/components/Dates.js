import React from 'react'

export default function Dates({invoiceNumber , invoiceDate, dueDate}) {
  return (
    <>
      {/* Dates */}
      <article className="mt-10 mb-14 flex items-end justify-end">
        <ul>
          <li className="p-1"><span className="font-bold">Invoice Date:</span>{invoiceNumber}</li>
          <li className="p-1 bg-gray-100"><span className="font-bold">INVOICE number:</span>{invoiceDate}</li>
          <li className="p-1"><span className="font-bold">Due date:</span>{dueDate}</li>
        </ul>
      </article>
    </>
  )
}
