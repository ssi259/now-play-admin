import React, { useState } from "react";
import Axios from 'axios';
function SportModal({closeModal}){
    const url = `${process.env.REACT_APP_API_PATH}/sports`;
    const [data,setData] = useState({
        name: "",
        type:"",
        about:""
    })
    function handle(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
    async function submit(e){
        e.preventDefault();
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
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="sportType" class="col-sm-2 label">Type</label>
                        <div class="col-sm-10">
                        <input onChange={(e)=>handle(e)} name="type" class="form-control" id="type" placeholder="sport Type"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="aboutSport" class="col-sm-2 label">About</label>
                        <div class="col-sm-10">
                        <textarea onChange={(e)=>handle(e)} name="about" class="form-control" id="about" placeholder="About Sport"/>
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