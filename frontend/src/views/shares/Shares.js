import React, { useEffect, useState } from "react";
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons'
import { CRow, CFormInput, CCol, CButton, CFormSelect, CTable, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow, CTableHead } from '@coreui/react'
import {addShare, getShare,deleteShare, getShareName, updateShare} from '../../services/shareService'
const Shares = () => {
    useEffect(()=>{
        document.title = "Shares"
    },[])
    const [showForm, setShowForm] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false)
    const [share,setShare] = useState({
        user_id : localStorage.getItem("id"),
        name :''
    })
    const handleChange = (e) => {
        setShare((prev) => {
            prev = {
                ...prev,
                [e.target.name]: e.target.value
            }
            return prev;
        });
    }
    const editS=(id)=>{
        setShowForm(true)
        setIsUpdate(true)
        getShareName(id).then(res=>{
            setShare(prev=>{
                return {
                    ...prev,
                    id : res.data.id,
                    name : res.data.name
                }
            })
        }).catch(err=>console.log(err))
    }
    const addShares = () =>{
        addShare(share).then(res=>console.log(res)).catch(err=>console.log(err))
        window.location.reload();
    }

    const updateData=()=>{
        updateShare(share).then(res=>console.log(res)).catch(err=>console.log(err))
        setIsUpdate(false)
        window.location.reload()
    }
    const [shareList, setShareList] = useState([])
    useEffect(()=>{
        getShare().then(res=>{
            setShareList(prev => {
                prev = res.data.map((e) => {
                    return {
                        share_id: e.id,
                        share_name: e.name
                    }
                })
                return [...prev];
            });
        }).catch(err=>console.log(err))
    },[])
    return (
        <>
            <CRow>
                <CCol xs>
                    <CButton
                        color="success"
                        style={{ color: "white" }}
                        onClick={() => { setShowForm(!showForm) }}
                    >
                        <CIcon style={{ marginRight: 1 }} icon={cilPlus} />Add
                    </CButton>
                </CCol>
            </CRow>
            {
                showForm &&
                <CRow className="mt-3">
                    <CCol md="4">
                        <CFormInput type="text" name="user_id" value={share.user_id} floatingLabel={"User Id"} floatingClassName="mb-3" disabled/>
                    </CCol>
                    <CCol md="4">
                        <CFormInput type="text" floatingLabel={"Share Name"} name="name" value={share.name} onChange={handleChange}floatingClassName="mb-3" />
                    </CCol>
                    <CCol md="4" className="d-flex align-items-center">
                    {(isUpdate === true) ? <CButton
                                color="success"
                                style={{ color: "white" }}
                                onClick={updateData}
                            >
                                Update 
                            </CButton> : <CButton
                                color="success"
                                style={{ color: "white" }}
                                onClick={addShares}
                            >
                                Add New
                            </CButton>}
                    </CCol>
                </CRow>
            }
            <CRow className="mt-3">
                <CCol xs>
                <center><h2>Shares List</h2></center>
                    <CTable hover>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>Id</CTableHeaderCell>
                                <CTableHeaderCell>Share Name</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {
                                shareList.map(e => (
                                    <CTableRow key={e.share_id} color='primary'>
                                        <CTableDataCell>{e.share_id}</CTableDataCell>
                                        <CTableDataCell>{e.share_name}</CTableDataCell>
                                        <CTableDataCell><CButton color='info' onClick={() => editS(e.share_id)}>Edit</CButton></CTableDataCell>
                                    </CTableRow>
                                ))
                            }
                        </CTableBody>
                    </CTable>
                </CCol>
            </CRow>
        </>
    );
}

export default Shares;
