import React, { useEffect, useState } from "react";
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons'
import { CRow, CFormInput, CCol, CButton, CFormSelect, CTable, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow, CTableHead } from '@coreui/react'
import { addBrok,getBrok } from '../../services/brokerageService'

const Brokerage = () => {
    const [showBrokerage, setShowBrokerage] = useState({
        user_id: `${localStorage.getItem("id")}`,
        perc: ""
    });
    const [brokerageList,setBrokerageList]=useState([])

    useEffect(()=>{
        getBrok().then(res=>{
            setBrokerageList(prev=>{
                prev = res.data.map(e=>{
                    return{
                        id : e.id,
                        perc : e.perc
                    }
                })
                return [...prev]
            })
        }).catch(err=>console.log(err))
    },[])
    console.log(brokerageList)
    const handleChange = (e) => {
        setShowBrokerage((prev) => {
            prev = {
                ...prev,
                [e.target.name]: e.target.value
            }
            return prev;
        });
    }

    const addBrokerage = async () => {
        addBrok(showBrokerage).then(res => console.log(res)).catch(err => console.log(err))
        window.location.reload();
    }
    return (
        <>
            
            <CRow className="mt-3">
                <CCol md="4">
                    <CFormInput type="text" floatingLabel={"User ID"} floatingClassName="mb-3" onChange={handleChange} value={showBrokerage.user_id} disabled />
                </CCol>
                <CCol md="4">
                    <CFormInput type="text" floatingLabel={"Percentage"} onChange={handleChange} name="perc" value={showBrokerage.perc} floatingClassName="mb-3" />
                </CCol>
                <CCol md="4" className="d-flex align-items-center">
                    <CButton
                        color="success"
                        style={{ color: "white" }}
                        onClick={addBrokerage}
                    >
                        Save
                    </CButton>
                </CCol>
            </CRow>
            <CRow className="mt-3">
            <center><h2>Brokerage List</h2></center>
            <CTable hover>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>Id</CTableHeaderCell>
                                <CTableHeaderCell>Perc</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {
                                brokerageList.map(e => (
                                    <CTableRow key={e.id} color='primary'>
                                        <CTableDataCell>{e.id}</CTableDataCell>
                                        <CTableDataCell>{e.perc}</CTableDataCell>
                                    </CTableRow>
                                ))
                            }
                        </CTableBody>
                    </CTable>
            </CRow>
        </>
    );
}

export default Brokerage;
