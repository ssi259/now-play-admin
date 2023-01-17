import React, { useState,useEffect } from "react";
import Axios from 'axios';

const AcademiesModal = ({closeModal}) => {
    const[Sports,setSports] = useState([]);
    const [data,setData] = useState([])
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(()=>{
        getSportsDetails();
    },[formErrors])
    const getSportsDetails=async()=>{
        let sports = await fetch(`${process.env.REACT_APP_API_PATH}/sports`);
        sports = await sports.json();
        console.log("sports"+sports[0])
        setSports(sports);
    }
    function handle(e){
        const newData = {...data}
        newData[e.target.name] = e.target.value
        setData(newData)
    }
    async function submit(e){
        e.preventDefault();
        console.log("data_sport id",data.sport_id)
        // await setFormErrors(validate(data));
        // setIsSubmit(true);
        // if (Object.keys(formErrors).length === 0 && isSubmit) {
        await Axios.post(`${process.env.REACT_APP_API_PATH}/academies`,{
            sports_id:data.sport_id,
            name: data.name,
            phone_number: data.phone,
            email: data.email,
            // city: data.city,
            // state: data.state,
            // pincode: data.pincode
        }).then(res =>{
            console.log(res.data)
        })
        {closeModal(false)}
    }
    // }
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.sports_id) {
          errors.sports_id = "Sports is required!";
        }
        if (!values.name) {
          errors.name = "Academy Name is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.phone) {
            errors.phone = "Phone Number is required!";
        }
        return errors;
      };
    return(
        
        <div  className = "modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={()=>{closeModal(false)}}>X</button>
                </div>
                <div><h1>Add Academies</h1>
                </div>
                    
                <form>
                    <div className="overlay">
                        <div class="form-group row">
                            <label for="coach-name" class="col-sm-2 label">Name</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} id = "name" class="form-control" value= {data.name} name = "name" placeholder="Academy Name"/>
                            <span>{formErrors.name}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="coach-email" class="col-sm-2 label">Email</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} id = "email" class="form-control" value= {data.email} name = "email" placeholder="Academy Email"/>
                            <span>{formErrors.email}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="coach-phn" class="col-sm-2 label">Phone</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} id = "phone" class="form-control" value= {data.phone} name = "phone" placeholder="Phone Number"/>
                            <span>{formErrors.phone}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="coach-name" class="col-sm-2 label">Sport</label>
                            <div class="col-sm-10">
                                <select class="form-control" name= "sport_id" onChange={(e)=>handle(e)}>
                                    <option class="form-control" name= "sport_id"> -- Select a sport -- </option>
                                    {Sports.map((sport) => <option class="form-control" value={sport.id} name= "sport_id">{sport.name}</option>)}
                                </select>
                                <span>{formErrors.sport_id}</span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-10">
                                <button type="submit" class="btn btn-primary"  onClick={ (e)=> submit(e)}>Submit</button>
                            </div>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AcademiesModal