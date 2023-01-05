import React, { useState,useEffect } from "react";
import Axios from 'axios';
function CoachModal({closeModal}){
    const initialValues = {  sports_id:"",
        name: "",
        phone_number: "",
        about: "",
        experience: "",
        email: "",
        city: "",
        state: "",
        locality: "",
        pincode: ""
    };
    const[Sports,setSports] = useState([]);
    const [data,setData] = useState(initialValues)
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
        await setFormErrors(validate(data));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            await Axios.post(`${process.env.REACT_APP_API_PATH}/coach`,{
                sports_id:data.sports_id,
                name: data.name,
                phone_number: data.phone_number,
                about: data.about,
                experience: data.experience,
                email: data.email,
                city: data.city,
                state: data.state,
                locality: data.locality,
                pincode: data.pincode
            }).then(res =>{
                alert("Coach Added Successfully")
            })
            .catch(err=>{
                alert(err.response.data.details)
            })
            {closeModal(false)} 
          }
    }
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const name_regex =  /^[a-z ,.'-]+$/i;
        if (!values.sports_id) {
          errors.sports_id = "Sports is required!";
        }
        if (!values.name) {
          errors.name = "Name is required!";
        } else if (!name_regex.test(values.name)) {
            errors.name = "This is not a valid character !";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.phone_number) {
            errors.phone_number = "Phone Number is required!";
        }
        if (!values.experience) {
            errors.experience = "Experience is required!";
        }
        if (!values.city) {
            errors.city = "City is required!";
        }
        if (!values.state) {
            errors.state = "State is required!";
        }
        if (!values.locality) {
            errors.locality = "Locality is required!";
        }
        if (!values.pincode) {
            errors.pincode = "Pincode is required!";
        }
        return errors;
      };


    return(
        
        <div  className = "modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={()=>{closeModal(false)}}>X</button>
                </div>
                <div><h4>Create Coach</h4>
                </div>
                    
                <form>
                    <div className="overlay">
                        <div className="form-group row">
                            <label htmlFor="coach-name" className="col-sm-2 label">Name</label>
                            <div className="col-sm-10">
                            <input onChange={(e)=>handle(e)} id = "name" className="form-control" value= {data.name} name = "name" placeholder="coach Name"/>
                            <span>{formErrors.name}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="coach-email" className="col-sm-2 label">Email</label>
                            <div className="col-sm-10">
                            <input onChange={(e)=>handle(e)} id = "email" className="form-control" value= {data.email} name = "email" placeholder="coach Email"/>
                            <span>{formErrors.email}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="coach-phn" className="col-sm-2 label">Phone</label>
                            <div className="col-sm-10">
                            <input onChange={(e)=>handle(e)} id = "phone" className="form-control" value= {data.phone_number} name = "phone_number" placeholder="Phone Number"/>
                            <span>{formErrors.phone_number}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="coach-name" className="col-sm-2 label">Sport</label>
                            <div className="col-sm-10">
                                <select className="form-control" name= "sports_id" onChange={(e)=>handle(e)}>
                                    <option className="form-control" value=""> -- Select a sport -- </option>
                                    {Sports.map((sport) => <option key={sport.id} className="form-control" value={sport.id} >{sport.name}</option>)}
                                </select>
                                <span>{formErrors.sports_id}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="experience" className="col-sm-2 label">Exp</label>
                            <div className="col-sm-10">
                                <input onChange={(e)=>handle(e)} name="experience" className="form-control" id="experience" placeholder="Experience in months"/>
                                <span>{formErrors.experience}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="about-coach" className="col-sm-2 label">About</label>
                            <div className="col-sm-10">
                            <textarea onChange={(e)=>handle(e)} name="about" className="form-control" id="about-coach" placeholder="About Coach"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="locality" className="col-sm-2 label">Locality</label>
                            <div className="col-sm-10">
                            <input onChange={(e)=>handle(e)} name="locality" className="form-control" id="locality" placeholder="Locality"/>
                            <span>{formErrors.locality}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="city" className="col-sm-2 label">City</label>
                            <div className="col-sm-10">
                            <input onChange={(e)=>handle(e)} name="city" className="form-control" id="city" placeholder="city"/>
                            <span>{formErrors.city}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="city" className="col-sm-2 label">State</label>
                            <div className="col-sm-10">
                            <input onChange={(e)=>handle(e)} name="state" className="form-control" id="state" placeholder="state"/>
                            <span>{formErrors.state}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="city" className="col-sm-2 label">Pincode</label>
                            <div className="col-sm-10">
                            <input onChange={(e)=>handle(e)} name="pincode" className="form-control" id="pincode" placeholder="pincode"/>
                            <span>{formErrors.pincode}</span>
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary"  onClick={ (e)=> submit(e)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CoachModal;