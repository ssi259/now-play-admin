import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function Sports(){
    const[Sports,setSports] = useState([]);
    useEffect(()=>{
        getSportsDetails();
    },[])
    const getSportsDetails=async()=>{
        let sports = await fetch('http://localhost:3000/sports');
        sports = await sports.json();
        setSports(sports);
    }
    console.log("Sports",Sports)
    return(
        <div className="batch-list">
            <h3 className="batch-heading">Coach List  <button onClick={()=>{alert("Edit Batch")}}>{<IoMdAdd/>}</button></h3>
            <div class = "table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sport Name</th>
                            <th>Type</th>
                            <th>About</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        Sports.map((item, index) => {
                        return (
                                <tr>
                                    <th>{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{"Cricket"}</td>
                                    <td>{5}</td>
                                    <td ><button onClick={()=>{alert("Edit Coach")}}>{<FaEdit/>}</button></td>

                                </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>  
    )
}
export default Sports