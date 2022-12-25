import React, { useState, useEffect } from "react";
import Axios from 'axios';
function SportModal({closeModal}){
    const url = `${process.env.REACT_APP_API_PATH}/sports`;
    const [data,setData] = useState({
        name: "",
        type:"",
        about:""
    })
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    function handle(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
    async function submit(e){
        e.preventDefault();
        await setFormErrors(validate(data));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        await Axios.post(url,{
            name: data.name,
            type: data.type,
            about: data.about
        }).then(res =>{
            console.log(res.data)
        })
        .catch(err=>{
            alert(err.response.data.details)
        })
        {closeModal(false)}
    }

    }
    const validate = (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Name is required!";
        }
        if (!values.type) {
            errors.type = "Type is required!";
        }
        if (!values.about) {
            errors.about = "About is required!";
        }
        
        return errors;
      };
    return(
        
        <div className = "modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={()=>{closeModal(false)}}>X</button>
                </div>
                <div className="title"><h1>Create Sport</h1>
                </div>
                    
                <form>
                    <div class="form-group row">
                        <label for="sportName" class="col-sm-2 label">Name</label>
                        <div class="col-sm-10">
                        <input onChange={(e)=>handle(e)} id = "name" class="form-control" value= {data.name} name = "name" placeholder="sport Name"/>
                        <span>{formErrors.name}</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="sportType" class="col-sm-2 label">Type</label>
                        <div class="col-sm-10">
                        <input onChange={(e)=>handle(e)} name="type" class="form-control" id="type" placeholder="sport Type"/>
                        <span>{formErrors.type}</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="aboutSport" class="col-sm-2 label">About</label>
                        <div class="col-sm-10">
                        <textarea onChange={(e)=>handle(e)} name="about" class="form-control" id="about" placeholder="About Sport"/>
                        <span>{formErrors.about}</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-10">
                            <button type="submit" class="btn btn-primary"  onClick={ (e)=> submit(e)}>Submit</button>
                        </div>
                    </div>     
                </form>
            </div>
        </div>
    )
}
export default SportModal;