import axios from 'axios'
import React from 'react'

const CheckOTP = () => {

  const [otp, setOtp] = React.useState('')
  const [phone_number, setPhone_number] = React.useState('')
  const handle = (e) => {
    setPhone_number(e.target.value)
  }

  const Submit = async (e) => {

      await axios.get(`${process.env.REACT_APP_API_PATH}/notifications/otp/getotp?phone_number=${phone_number}`)
      .then((res) => {
        return res.data
        }).then((data) => {
            setOtp(data.data.otp)
        })
        .catch((err) => {
            alert("Error in getting OTP");
        })
    }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      fontSize: '20px',
    }} >
        <h3>Check OTP</h3> 
            <br/>
            <input onChange={handle} type="text" placeholder="Enter Phone Number"/>
            <button onClick={()=>Submit()}>GET OTP</button>
            <br/>
        <h3>OTP for {phone_number} is {otp}</h3>
    </div>
  )
}

export default CheckOTP
