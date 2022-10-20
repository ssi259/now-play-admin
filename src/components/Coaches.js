import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";

function Coaches(){
    const[coaches,setCoaches] = useState([]);
    useEffect(()=>{
        getBatchDetails();
    },[])
    const getBatchDetails=async()=>{
        let batches = await fetch('http://localhost:3000/batches/search?lat=28.21&&lng=78.12');
        batches = await batches.json();
        setCoaches(batches.batchList);
    }
    console.log("coaches",coaches)
    return(
        <div className="batch-list">
            <h3 className="batch-heading">Coach List</h3>
            <div class = "table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coach Name</th>
                            <th>Sport</th>
                            <th>Experience</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        coaches.map((item, index) => {
                        return (
                                <tr>
                                    <th>{index+1}</th>
                                    <td>{"Ravi"}</td>
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
export default Coaches