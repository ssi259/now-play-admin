import React from 'react'
import { Button } from '@mui/material'
import { Link,Routes,Route, BrowserRouter } from 'react-router-dom'
import PaymentAudit from './PaymentAudit'

const Audits = () => {
  return (
    <nav className="text-center" >
          <br />
          <Link style={{textDecoration:'none'}} to="/audits/payments">
             <Button style={{
          backgroundColor: "#87CEEB",color:"white"
             }} value="Payment Audit">Payments</Button>
          </Link> 
          &nbsp;
      <Link style={{ textDecoration: 'none' }} to="/audits/reschedules">
        <Button style={{
          backgroundColor: "#87CEEB",color:"white"
        }} value="Reschedule/Cancel Class Audit">Reschedule / Cancel</Button>
          </Link>
    </nav>
  )
}
export default Audits
