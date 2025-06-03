import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
import {getShareName} from '../../services/shareService'
import {deletePurchase} from '../../services/purchaseService'

function PurchaseList(props) {
    const plist = props.list;
    const deleteP= (id)=>{
        deletePurchase(id).then(res=>console.log(res)).catch(err=>console.log(err))
        window.location.reload();
    }
    return (
        <div>
            <CTable hover>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Id</CTableHeaderCell>
                        <CTableHeaderCell>Purchase Date</CTableHeaderCell>
                        <CTableHeaderCell>Share Name</CTableHeaderCell>
                        <CTableHeaderCell>Quantity</CTableHeaderCell>
                        <CTableHeaderCell>Rate</CTableHeaderCell>
                        <CTableHeaderCell>Brokerage</CTableHeaderCell>
                        <CTableHeaderCell>Gst on Brokerage</CTableHeaderCell>
                        <CTableHeaderCell>Security Taxes</CTableHeaderCell>
                        <CTableHeaderCell>Other Taxes</CTableHeaderCell>
                        <CTableHeaderCell>Net Amount</CTableHeaderCell>
                        <CTableHeaderCell>Average</CTableHeaderCell>
                        <CTableHeaderCell>Edit</CTableHeaderCell>
                        <CTableHeaderCell>Delete</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        plist.map(e => (
                            <CTableRow key={e.id} color='primary'>
                                <CTableDataCell>{e.id}</CTableDataCell>
                                <CTableDataCell>{e.pdate.toString().split('T')[0]}</CTableDataCell>
                                <CTableDataCell>{e.share_id}</CTableDataCell>
                                <CTableDataCell>{e.qty}</CTableDataCell>
                                <CTableDataCell>{e.rate}</CTableDataCell>
                                <CTableDataCell>{e.brokerage}</CTableDataCell>
                                <CTableDataCell>{e.gstbrok}</CTableDataCell>
                                <CTableDataCell>{e.security}</CTableDataCell>
                                <CTableDataCell>{e.other}</CTableDataCell>
                                <CTableDataCell>{e.net}</CTableDataCell>
                                <CTableDataCell>{e.avg}</CTableDataCell>
                                <CTableDataCell><CButton color='info' onClick={()=>editP(e.id)}>Edit</CButton></CTableDataCell>
                                <CTableDataCell><CButton color='danger' onClick={()=>deleteP(e.id)}>Delete</CButton></CTableDataCell>
                            </CTableRow>
                        ))
                    }
                </CTableBody>
            </CTable>
        </div>
    )
}

export default PurchaseList