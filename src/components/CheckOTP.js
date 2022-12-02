import axios from 'axios'
import React from 'react'

const CheckOTP = () => {

  const [otp, setOtp] = React.useState('')
  const [phone_number, setPhone_number] = React.useState('')
  const handle = (e) => {
    setPhone_number(e.target.value)
  }

  const Submit = async (e) => {

      await axios.get(`http://localhost:3000/notifications/otp/getotp?phone_number=${phone_number}`)
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
    <div>
        <h3>Check OTP</h3> 
            <input onChange={handle} type="text" placeholder="Enter Phone Number"/>
            <button onClick={()=>Submit()}>GET OTP</button>
        <h3>OTP for {phone_number} is {otp}</h3>
    </div>
  )
}

export default CheckOTP
