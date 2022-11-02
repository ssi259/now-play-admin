import React, { useState } from "react";
import Axios from 'axios';
function SportModal({closeModal}){
    const url = "http://3.111.147.217:3000/coach";
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
        {closeModal(false)}

    }
    return(
        
        <div  className = "modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={()=>{closeModal(false)}}>X</button>
                </div>
                <div className="title"><h1>Create Coach</h1>
                </div>
                    
                <form>
                    <div className="overlay">
                        <div class="form-group row">
                            <label for="coach-name" class="col-sm-2 label">Name</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} id = "name" class="form-control" value= {data.name} name = "name" placeholder="coach Name"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="coach-email" class="col-sm-2 label">Email</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} id = "name" class="form-control" value= {data.name} name = "name" placeholder="coach Email"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="coach-phn" class="col-sm-2 label">Phone</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} id = "name" class="form-control" value= {data.name} name = "name" placeholder="Phone Number"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="coach-name" class="col-sm-2 label">Sport</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} id = "name" class="form-control" value= {data.name} name = "name" placeholder="sport Name"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="experience" class="col-sm-2 label">Exp</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} name="type" class="form-control" id="type" placeholder="Experience in months"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="about-coach" class="col-sm-2 label">About</label>
                            <div class="col-sm-10">
                            <textarea onChange={(e)=>handle(e)} name="about" class="form-control" id="about-coach" placeholder="About Coach"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="locality" class="col-sm-2 label">Locality</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} name="localitys" class="form-control" id="locality" placeholder="Locality"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="city" class="col-sm-2 label">City</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} name="locality" class="form-control" id="locality" placeholder="city"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="city" class="col-sm-2 label">Pincode</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} name="pincode" class="form-control" id="pincode" placeholder="pincode"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="city" class="col-sm-2 label">City</label>
                            <div class="col-sm-10">
                            <input onChange={(e)=>handle(e)} name="localitys" class="form-control" id="locality" placeholder="city"/>
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
export default SportModal;