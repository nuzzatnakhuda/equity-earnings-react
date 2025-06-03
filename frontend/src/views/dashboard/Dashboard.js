import React, { useEffect, useState } from 'react'
// import classNames from 'classnames'
import { CRow, CCard, CCardBody, CCardHeader, CCol } from '@coreui/react'
import {userInvest, userProfit} from "../../services/userServices"
// import axios from 'axios'
// import axios from "../../axiosUtil";

const Dashboard = () => {
  
  const [invested, setInvested] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(()=>{
    if(localStorage.getItem("token")===null || localStorage.getItem("id")===null)
      window.location.href="#/login"
  })

  useEffect(()=>{
    document.title = "Equity Earnings Explorer"
    
      userInvest(localStorage.getItem("id"))
      .then((res) => {
        setInvested(res.data.amt)
      }).
      catch(err => console.log(err))

      userProfit().then(res => {
        if(res.data[0].total_profit===null)
          setProfit(0)
        else
          setProfit(res.data[0].total_profit)
      }).catch(err => console.log(err));
  },[])
  return (
    <>
      <CRow>
        <CCol md={4} xs={12}>
          <CCard className='bg-main text-white'>
            <CCardHeader>
              <h4 className='text-center'>
                Total invested Amount
              </h4>
            </CCardHeader>
            <CCardBody className='text-center'><h5>{invested}</h5></CCardBody>
          </CCard>
        </CCol>
        <CCol md={4} xs={12}>
          <CCard className='bg-main text-white'>
            <CCardHeader>
              <h4 className='text-center'>
                Total Profit
              </h4>
            </CCardHeader>
            <CCardBody className='text-center'><h5>{profit}</h5></CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )

}

export default Dashboard
