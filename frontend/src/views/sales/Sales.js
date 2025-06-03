import React, { useEffect, useState } from "react";
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons'
import { CRow, CFormInput, CCol, CButton, CTable, CHeader, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CTableHead, CFormSelect } from '@coreui/react'
import { userStock } from '../../services/userServices'
import { addSales, deleteSales, getSales, getUserSales, updateSales } from "../../services/salesService";
import { getShareName } from "../../services/shareService";

const Sales = () => {
    useEffect(() => {
        if (localStorage.getItem("token") === null || localStorage.getItem("id") === null)
            window.location.href = "#/login"
    })
    useEffect(() => {
        document.title = "Sales";
        setFormData(prev => {
            return {
                ...prev, id: 0,
                sdate: "",
                user_id: localStorage.getItem("id"),
                share_id: 0,
                qty: 0,
                rate: 0,
                brokerage: 0,
                gstbrok: 0,
                security: 0,
                other: 0,
                net: 0,
                avg: 0,
                profit: 0
            }
        })
    }, [])
    const [formData, setFormData] = useState([])
    const [stockList, setStockList] = useState([])
    useEffect(() => {
        userStock(localStorage.getItem("id")).then(res => {
            setStockList(prev => {
                prev = res.data.map(e => {
                    return {
                        id: e.id,
                        user_id: e.user_id,
                        share_id: e.share_id,
                        share_name: e.share.name,
                        qty: e.qty,
                        cost: e.cost
                    }
                })
                return [...prev]
            })
        }).catch(err => console.log(err))
    }, [])

    const submitData = () => {
        if (formData.sdate === "" || formData.qty === 0 || formData.rate === 0 || formData.brokerage === 0 || formData.gstbrok === 0 ||
            formData.security === 0 || formData.other === 0 || formData.net === 0 || formData.avg === 0)
            alert("Please Enter Valid Values")
        else {
            addSales(formData).then(res => 
                {
                    console.log(res)
                }).catch(err => console.log(err))
            setShowForm(false)
            window.location.reload()
        }
    }

    const makeSales = (share_id) => {

        setFormData(prev => {
            return {
                ...prev,
                user_id: localStorage.getItem("id"),
                share_id: share_id,
            }
        })
    }
    const amt = () => {
        setFormData(prev => {
            return {
                ...prev,
                gstbrok: prev.brokerage * 0.18,
                net: (Number(prev.qty) * Number(prev.rate)) - Number(prev.brokerage) - Number(prev.security) - Number(prev.other)
            }
        });
        setFormData(prev => {
            return {
                ...prev,
                net: prev.net - prev.gstbrok
            }
        })
        setFormData(prev => {
            return {
                ...prev,
                avg: prev.net / prev.qty
            }
        })
    }
    const commonHandlechange = (e) => {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }
    //Delete Sales
    const deleteS = (id) => {
        deleteSales(id).then(res => console.log(res)).catch(err => console.log(err))
        window.location.reload();
    }

    //Edit Sales
    const [isUpdate, setIsUpdate] = useState("false")
    const editS = (id) => {
        getSales(id).then(res => {
            console.log(res)
            setShowForm(true)
            setIsUpdate(true)
            setFormData(prev => {
                return {
                    ...prev,
                    id: res.data.id,
                    sdate: res.data.sdate.toString().split('T')[0],
                    user_id: res.data.user_id,
                    share_id: res.data.share_id,
                    share_name: res.data.share.name,
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
    }
    const updateData = () => {
        console.log(formData)
        updateSales(formData).then(res => console.log(res)).catch(err => console.log(err))
        window.location.reload()
    }
    const [showForm, setShowForm] = useState(false);
    const [salesList, setSalesList] = useState([])
    useEffect(() => {
        getUserSales().then(res => {
            setSalesList(prev => {
                prev = res.data.map(e => {
                    return {
                        id: e.id,
                        sdate: e.sdate,
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
                        avg: e.avg,
                        profit: e.profit
                    }
                })
                return [...prev]
            })
        }).catch(err => console.log(err))
    }, [])
    return (
        <>
            <center><h2>Stock</h2></center>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>ID</CTableHeaderCell>
                        <CTableHeaderCell> Share ID</CTableHeaderCell>
                        <CTableHeaderCell>Quantity</CTableHeaderCell>
                        <CTableHeaderCell>cost</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        stockList.map(e => (
                            <CTableRow key={e.id} color='primary'>
                                <CTableDataCell>{e.id}</CTableDataCell>
                                <CTableDataCell>{e.share_name}</CTableDataCell>
                                <CTableDataCell>{e.qty}</CTableDataCell>
                                <CTableDataCell>{e.cost}</CTableDataCell>
                                <CTableDataCell><CButton
                                    color="success"
                                    style={{ color: "white" }}
                                    onClick={() => { setShowForm(!showForm), makeSales(e.share_id) }}
                                >
                                    Sell
                                </CButton></CTableDataCell>
                            </CTableRow>
                        ))
                    }
                </CTableBody>
            </CTable>
            <CRow>

                <CCol xs>

                </CCol>
            </CRow>
            {
                showForm &&
                <><CRow className="mt-3">
                    <CCol md="6">
                        <CFormInput type="date" floatingLabel={"Sold Date"} name="sdate" onChange={commonHandlechange} value={formData.sdate} floatingClassName="mb-3" />
                    </CCol>
                    <CCol md="6">
                        <CFormInput type="text" floatingLabel={"User Id"} name="user_id" value={formData.user_id} floatingClassName="mb-3" disabled />
                    </CCol>
                </CRow>
                    <CRow className="mt-3">
                        <CCol md="4">
                            {(isUpdate===true) ?
                                <CFormSelect name="share_id" value={formData.share_id} disabled>
                                    <option key={formData.share_id} value={formData.share_id}>{formData.share_name}</option>
                                </CFormSelect>
                                :
                                <CFormInput type="text" floatingLabel={"Share Id"} value={formData.share_id} floatingClassName="mb-3" disabled />
                            }
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
                        <CCol md="4">
                            <CFormInput type="text" floatingLabel={"Net Amount"} name="net" value={formData.net} floatingClassName="mb-3" disabled />
                        </CCol>
                        <CCol md="4">
                            <CFormInput type="text" floatingLabel={"Average Amount"} name="avg" value={formData.avg} floatingClassName="mb-3" disabled />
                        </CCol>
                    </CRow><CRow className="mt-3">
                        <CCol md="4" className="d-flex align-items-center">
                            {(isUpdate === true) ? <CButton
                                color="success"
                                style={{ color: "white" }}
                                onClick={updateData}
                            >
                                Update Sales
                            </CButton> : <CButton
                                color="success"
                                style={{ color: "white" }}
                                onClick={submitData}
                            >
                                Add New Sales
                            </CButton>}
                        </CCol>
                    </CRow></>
            }
            <CRow className="mt-3">
                <CCol xs>
                    <center><h2>Sales Shares List</h2></center>
                    <CTable hover>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>Id</CTableHeaderCell>
                                <CTableHeaderCell>Sales Date</CTableHeaderCell>
                                <CTableHeaderCell>Share Name</CTableHeaderCell>
                                <CTableHeaderCell>Quantity</CTableHeaderCell>
                                <CTableHeaderCell>Rate</CTableHeaderCell>
                                <CTableHeaderCell>Brokerage</CTableHeaderCell>
                                <CTableHeaderCell>Gst on Brokerage</CTableHeaderCell>
                                <CTableHeaderCell>Security Taxes</CTableHeaderCell>
                                <CTableHeaderCell>Other Taxes</CTableHeaderCell>
                                <CTableHeaderCell>Net Amount</CTableHeaderCell>
                                <CTableHeaderCell>Average</CTableHeaderCell>
                                <CTableHeaderCell>Profit/Loss</CTableHeaderCell>
                                <CTableHeaderCell>Edit</CTableHeaderCell>
                                <CTableHeaderCell>Delete</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {
                                salesList.map(e => (
                                    <CTableRow key={e.id} color='primary'>
                                        <CTableDataCell>{e.id}</CTableDataCell>
                                        <CTableDataCell>{e.sdate.toString().split('T')[0]}</CTableDataCell>
                                        <CTableDataCell>{e.share_name}</CTableDataCell>
                                        <CTableDataCell>{e.qty}</CTableDataCell>
                                        <CTableDataCell>{e.rate}</CTableDataCell>
                                        <CTableDataCell>{e.brokerage}</CTableDataCell>
                                        <CTableDataCell>{e.gstbrok}</CTableDataCell>
                                        <CTableDataCell>{e.security}</CTableDataCell>
                                        <CTableDataCell>{e.other}</CTableDataCell>
                                        <CTableDataCell>{e.net}</CTableDataCell>
                                        <CTableDataCell>{e.avg}</CTableDataCell>
                                        <CTableDataCell>{e.profit}</CTableDataCell>
                                        <CTableDataCell><CButton color='info' onClick={() => editS(e.id)}>Edit</CButton></CTableDataCell>
                                        <CTableDataCell><CButton color='danger' onClick={() => deleteS(e.id)}>Delete</CButton></CTableDataCell>
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

export default Sales;