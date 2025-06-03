import React, { useEffect, useState } from "react";
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons'
import { CRow, CFormInput, CCol, CButton, CFormSelect, CTable, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow, CTableHead } from '@coreui/react'
import { getShare } from '../../services/shareService'
import { addPurchase, getUserPurchase, deletePurchase, getPurchase, updatePurchase } from '../../services/purchaseService'
import PurchaseList from "./PurchaseList";

const Purchase = () => {
    useEffect(()=>{
        if(localStorage.getItem("token")===null || localStorage.getItem("id")===null)
          window.location.href="#/login"
      })
    useEffect(()=>{
        document.title = "Purchases"
    },[])
    const [showForm, setShowForm] = useState(false);
    const [share, setShare] = useState([])
    const [updateList, setUpdateList] = useState(0)
    const [isUpdate, setIsUpdate] = useState("false")
    const [formData, setFormData] = useState({
        id:0,
        pdate: "",
        user_id: localStorage.getItem("id"),
        share_id: 0,
        qty: 0,
        rate: 0,
        brokerage: 0,
        gstbrok: 0,
        security: 0,
        other: 0,
        net: 0,
        avg: 0
    });

    const [purchaseList, setPurchaseList] = useState([])
    useEffect(() => {
        getUserPurchase().then(res => {
            setPurchaseList(prev => {
                prev = res.data.map(e => {
                    return {
                        id: e.id,
                        pdate: e.pdate,
                        user_id: e.user_id,
                        share_id: e.share_id,
                        share_name: e.share.name,
                        qty: e.qty,
                        rate: e.rate,
                        brokerage: e.brokerage,
                        gstbrok: e.gstbrok,
                        security: e.security,
                        other: e.other,
                        net: e.net,
                        avg: e.avg
                    }
                })
                return [...prev]
            })
        }).catch(err => console.log(err))
    }, [updateList])

    useEffect(() => {
        getShare().then(res => {
            if (res.data.length > 0) {
                setFormData((prev) => ({ ...prev, share_id: res.data[0].id }))
            }
            setShare(prev => {
                prev = res.data.map((e) => {
                    return {
                        share_id: e.id,
                        share_name: e.name
                    }
                })
                return [...prev];
            });
        }).catch(err => console.log(err))
    }, []);
    const commonHandlechange = (e) => {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }
    const amt = () => {
        setFormData(prev => {
            return {
                ...prev,
                gstbrok: prev.brokerage * 0.18,
                net: (Number(prev.qty) * Number(prev.rate)) + Number(prev.brokerage) + Number(prev.security) + Number(prev.other)
            }
        });
        setFormData(prev => {
            return {
                ...prev,
                net: prev.net + prev.gstbrok
            }
        })
        setFormData(prev => {
            return {
                ...prev,
                avg: prev.net / prev.qty
            }
        })
    }

    const submitData = () => {
        console.log(formData)
        if (formData.pdate === "" || formData.qty === 0 || formData.rate === 0 || formData.brokerage === 0 || formData.gstbrok === 0 ||
            formData.security === 0 || formData.other === 0 || formData.net === 0 || formData.avg === 0)
            alert("Please Enter Valid Values")
        else {
            addPurchase(formData).then(res => console.log(res)).catch(err => console.log(err))
            setShowForm(false)
            window.location.reload()
        }
    }

    const deleteP = (id) => {
        deletePurchase(id).then(res => console.log(res)).catch(err => console.log(err))
        window.location.reload();
    }

    const editP = (id) => {
        getPurchase(id).then(res => {
            setShowForm(true)
            setIsUpdate(true)
            setFormData(prev => {
                return {
                    ...prev,
                    id: res.data.id,
                    pdate: res.data.pdate.toString().split('T')[0],
                    user_id: res.data.user_id,
                    share_id: res.data.share_id,
                    qty: res.data.qty,
                    rate: res.data.rate,
                    brokerage: res.data.brokerage,
                    gstbrok: res.data.gstbrok,
                    security: res.data.security,
                    other: res.data.other,
                    net: res.data.net,
                    avg: res.data.avg
                }
            })
        }).catch(err => console.log(err))
        console.log()
    }

    const updateData =()=>{
        console.log(formData)
        updatePurchase(formData).then(res=>console.log(res)).catch(err=>console.log(err))
        window.location.reload()
    }
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
                <><CRow className="mt-3">
                    <CCol md="6">
                        <CFormInput type="date" value={formData.pdate} onChange={commonHandlechange} floatingLabel={"Purchase Date"} name="pdate" floatingClassName="mb-3" />
                    </CCol>
                    <CCol md="6">
                        <CFormInput type="text" value={formData.user_id} floatingLabel={"User Id"} name="user_id" floatingClassName="mb-3" disabled />
                    </CCol>
                </CRow>
                    <CRow className="mt-3">
                        <CCol md="4">
                            <CFormSelect name="share_id" value={formData.share_id} onChange={commonHandlechange}>
                                {
                                    share.map((e, i) => {
                                        return (
                                            <option key={i} value={e.share_id}>{e.share_name}</option>
                                        )
                                    })
                                }
                            </CFormSelect>

                        </CCol>
                        <CCol md="4">
                            <CFormInput type="text" floatingLabel={"Quantity"} name="qty" value={formData.qty} onChange={e => {
                                commonHandlechange(e);
                                amt()
                            }} floatingClassName="mb-3" />
                        </CCol>
                        <CCol md="4">
                            <CFormInput type="text" floatingLabel={"Rate"} name="rate" value={formData.rate} onChange={e => {
                                commonHandlechange(e);
                                amt()
                            }} floatingClassName="mb-3" />
                        </CCol>
                    </CRow>
                    <CRow className="mt-3">
                        <CCol md="3">
                            <CFormInput type="text" floatingLabel={"Brokerage"} name="brokerage" value={formData.brokerage} onChange={(e) => {
                                commonHandlechange(e);
                                amt();
                            }} floatingClassName="mb-3" />
                        </CCol>
                        <CCol md="3">
                            <CFormInput type="text" floatingLabel={"GST Brokerage"} name="gstbrok" value={formData.gstbrok} floatingClassName="mb-3" disabled />
                        </CCol>
                        <CCol md="3">
                            <CFormInput type="text" floatingLabel={"Security"} name="security" value={formData.security} onChange={e => {
                                commonHandlechange(e);
                                amt();
                            }} floatingClassName="mb-3" />
                        </CCol>
                        <CCol md="3">
                            <CFormInput type="text" floatingLabel={"Other Taxes"} name="other" value={formData.other} onChange={e => {
                                commonHandlechange(e);
                                amt();
                            }} floatingClassName="mb-3" />
                        </CCol>
                    </CRow>
                    <CRow className="mt-3">
                        <CCol md="6">
                            <CFormInput type="text" floatingLabel={"Net Amount"} name="net" value={formData.net} floatingClassName="mb-3" disabled />
                        </CCol>
                        <CCol md="6">
                            <CFormInput type="text" floatingLabel={"Average Amount"} name="avg" value={formData.avg} floatingClassName="mb-3" disabled />
                        </CCol>
                    </CRow><CRow className="mt-3">
                        <CCol md="4" className="d-flex align-items-center">

                            {(isUpdate === true) ? <CButton
                                color="success"
                                style={{ color: "white" }}
                                onClick={updateData}
                            >
                                Update Purchase
                            </CButton> : <CButton
                                color="success"
                                style={{ color: "white" }}
                                onClick={submitData}
                            >
                                Add New Purchase
                            </CButton>}
                        </CCol>
                    </CRow></>
            }
            <CRow className="mt-3">
                <CCol xs>
                    <center><h2>Purchased Shares List</h2></center>
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
                                purchaseList.map(e => (
                                    <CTableRow key={e.id} color='primary'>
                                        <CTableDataCell>{e.id}</CTableDataCell>
                                        <CTableDataCell>{e.pdate.toString().split('T')[0]}</CTableDataCell>
                                        <CTableDataCell>{e.share_name}</CTableDataCell>
                                        <CTableDataCell>{e.qty}</CTableDataCell>
                                        <CTableDataCell>{e.rate}</CTableDataCell>
                                        <CTableDataCell>{e.brokerage}</CTableDataCell>
                                        <CTableDataCell>{e.gstbrok}</CTableDataCell>
                                        <CTableDataCell>{e.security}</CTableDataCell>
                                        <CTableDataCell>{e.other}</CTableDataCell>
                                        <CTableDataCell>{e.net}</CTableDataCell>
                                        <CTableDataCell>{e.avg}</CTableDataCell>
                                        <CTableDataCell><CButton color='info' onClick={() => editP(e.id)}>Edit</CButton></CTableDataCell>
                                        <CTableDataCell><CButton color='danger' onClick={() => deleteP(e.id)}>Delete</CButton></CTableDataCell>
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

export default Purchase;